import express, { Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import { DealIngestSchema, CreateAlertRuleSchema, DealIngestDTO, CreateAlertRuleDTO } from './types.js';
import { NotificationService } from './notification.service.js';
import { CrawlerOrchestrator } from './crawlers/orchestrator.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const notificationService = new NotificationService();
const crawlerOrchestrator = new CrawlerOrchestrator();

// BANCO DE DADOS EM MEMÓRIA (Com suporte a persistência SQL via PostgreSQL)
interface AlertRuleRecord extends CreateAlertRuleDTO {
  id: string;
  createdAt: Date;
  lastTriggeredAt?: Date;
}

interface ProcessedDeal extends DealIngestDTO {
  id: string;
  discountPct: number;
  unitPrice: number;
  isPriceBug: boolean;
  capturedAt: Date;
}

const activeAlertRules: AlertRuleRecord[] = [
  {
    id: 'rule-demo-1',
    userId: '00000000-0000-0000-0000-000000000001',
    title: 'Smartphones SP com >35% OFF',
    searchKeywords: 'iphone samsung motorola xiaomi',
    targetChannel: 'both',
    minDiscountPct: 35,
    scopeLevel: 'state',
    stateUf: 'SP',
    requireFreeShipping: false,
    channels: ['push', 'telegram'],
    telegramChatId: '123456789',
    createdAt: new Date()
  },
  {
    id: 'rule-demo-2',
    userId: '00000000-0000-0000-0000-000000000002',
    title: 'Atacado Alimentos e Bebidas Nacional',
    searchKeywords: 'cerveja fardo café arroz azeite',
    targetChannel: 'wholesale',
    minDiscountPct: 25,
    scopeLevel: 'national',
    requireFreeShipping: true,
    channels: ['whatsapp'],
    whatsappPhone: '5511999998888',
    createdAt: new Date()
  }
];

const liveDealsFeed: ProcessedDeal[] = [];

// ==========================================
// WEBSOCKET: TRANSMISSÃO EM TEMPO REAL (SSE / WS)
// ==========================================
const connectedClients = new Set<WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  connectedClients.add(ws);
  console.log(`[WebSocket] Novo cliente conectado. Total: ${connectedClients.size}`);

  // Envia as últimas 10 ofertas capturadas logo ao conectar
  ws.send(JSON.stringify({
    type: 'INITIAL_FEED',
    data: liveDealsFeed.slice(0, 10)
  }));

  ws.on('close', () => {
    connectedClients.delete(ws);
  });
});

function broadcastToClients(deal: ProcessedDeal) {
  const payload = JSON.stringify({
    type: 'NEW_DEAL',
    deal
  });

  for (const client of connectedClients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  }
}

// ==========================================
// MOTOR DE MATCHING E DISPARO DE REGRAS
// ==========================================
async function matchAndTriggerAlerts(deal: ProcessedDeal) {
  console.log(`[Motor Radar] Avaliando regras para: ${deal.title} (-${deal.discountPct}%)`);

  for (const rule of activeAlertRules) {
    // 1. Validar Desconto Mínimo
    if (deal.discountPct < rule.minDiscountPct) continue;

    // 2. Validar Preço Máximo
    if (rule.maxPrice && deal.currentPrice > rule.maxPrice) continue;

    // 3. Validar Canal (Varejo x Atacado)
    if (rule.targetChannel !== 'both' && deal.channel !== rule.targetChannel) continue;

    // 4. Validar Frete
    if (rule.requireFreeShipping && !deal.shipping.isFree) continue;

    // 5. Validar Abrangência Geográfica (IBGE)
    if (rule.scopeLevel === 'state' && rule.stateUf) {
      if (!deal.coverage.isNational && deal.coverage.stateUf !== rule.stateUf) {
        continue;
      }
    }

    if (rule.scopeLevel === 'city' && rule.cityName) {
      if (!deal.coverage.isNational && deal.coverage.cityName?.toLowerCase() !== rule.cityName.toLowerCase()) {
        continue;
      }
    }

    // 6. Validar Palavras-chave / EAN
    if (rule.ean && deal.ean && rule.ean !== deal.ean) continue;

    if (rule.searchKeywords) {
      const terms = rule.searchKeywords.toLowerCase().split(/\s+/);
      const titleLower = deal.title.toLowerCase();
      const matchFound = terms.some(term => titleLower.includes(term));
      if (!matchFound) continue;
    }

    // Regra Satisfeita -> DISPARAR NOTIFICAÇÕES
    console.log(`🎯 [MATCH] Alerta "${rule.title}" disparado para a oferta: ${deal.title}`);
    rule.lastTriggeredAt = new Date();

    if (rule.channels.includes('telegram') && rule.telegramChatId) {
      await notificationService.sendTelegramAlert(rule.telegramChatId, deal);
    }

    if (rule.channels.includes('whatsapp') && rule.whatsappPhone) {
      await notificationService.sendWhatsAppAlert(rule.whatsappPhone, deal);
    }
  }
}

// ==========================================
// ROTAS REST DA API
// ==========================================

/**
 * 1. POST /api/ingest
 * Endpoint consumido pelos Crawlers, APIs Oficiais e Webhooks de Parceiros
 */
app.post('/api/ingest', async (req: Request, res: Response) => {
  const parseResult = DealIngestSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Payload inválido', details: parseResult.error.format() });
  }

  const raw = parseResult.data;

  // Cálculo de desconto e preço unitário
  const discountPct = Number(
    (((raw.regularPrice - raw.currentPrice) / raw.regularPrice) * 100).toFixed(2)
  );
  const unitPrice = raw.packageUnits > 1
    ? Number((raw.currentPrice / raw.packageUnits).toFixed(2))
    : raw.currentPrice;

  const isPriceBug = discountPct >= 70.0;

  const processedDeal: ProcessedDeal = {
    ...raw,
    id: `deal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    discountPct,
    unitPrice,
    isPriceBug,
    capturedAt: new Date()
  };

  // Salvar no feed e manter no máximo 100 em memória
  liveDealsFeed.unshift(processedDeal);
  if (liveDealsFeed.length > 100) liveDealsFeed.pop();

  // Transmissão em tempo real (WebSocket)
  broadcastToClients(processedDeal);

  // Executar motor de regras e alertas assincronamente
  matchAndTriggerAlerts(processedDeal).catch(console.error);

  return res.status(201).json({
    message: 'Oferta ingerida com sucesso',
    dealId: processedDeal.id,
    discountPct,
    isPriceBug
  });
});

/**
 * 2. GET /api/deals
 * Retorna o feed de ofertas com filtros dinâmicos
 */
app.get('/api/deals', (req: Request, res: Response) => {
  const { channel, stateUf, minDiscount, maxPrice, search } = req.query;

  let results = [...liveDealsFeed];

  if (channel && channel !== 'all') {
    results = results.filter(d => d.channel === channel);
  }

  if (stateUf && stateUf !== 'ALL') {
    results = results.filter(d => d.coverage.isNational || d.coverage.stateUf === stateUf);
  }

  if (minDiscount) {
    results = results.filter(d => d.discountPct >= Number(minDiscount));
  }

  if (maxPrice) {
    results = results.filter(d => d.currentPrice <= Number(maxPrice));
  }

  if (search) {
    const s = String(search).toLowerCase();
    results = results.filter(d => 
      d.title.toLowerCase().includes(s) || 
      d.storeName.toLowerCase().includes(s) || 
      (d.ean && d.ean.includes(s))
    );
  }

  return res.json({
    total: results.length,
    deals: results
  });
});

/**
 * 3. POST /api/alerts
 * Cria uma nova regra de radar / alerta configurável
 */
app.post('/api/alerts', (req: Request, res: Response) => {
  const parseResult = CreateAlertRuleSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Parâmetros de alerta inválidos', details: parseResult.error.format() });
  }

  const newRule: AlertRuleRecord = {
    ...parseResult.data,
    id: `rule-${Date.now()}`,
    createdAt: new Date()
  };

  activeAlertRules.push(newRule);
  console.log(`[Novo Radar Criado] ${newRule.title} (Desconto mínimo: ${newRule.minDiscountPct}%)`);

  return res.status(201).json({
    message: 'Radar configurado com sucesso',
    rule: newRule
  });
});

/**
 * 4. GET /api/alerts
 * Lista os radares ativos
 */
app.get('/api/alerts', (req: Request, res: Response) => {
  return res.json({
    total: activeAlertRules.length,
    rules: activeAlertRules
  });
});

/**
 * 5. GET /api/crawlers/engines
 * Lista todos os motores de busca e crawlers ativos
 */
app.get('/api/crawlers/engines', (req: Request, res: Response) => {
  return res.json({
    engines: crawlerOrchestrator.getRegisteredEngines()
  });
});

/**
 * 6. POST /api/crawlers/scan-now
 * Executa uma varredura forçada em todos os motores por todo o Brasil
 */
app.post('/api/crawlers/scan-now', async (req: Request, res: Response) => {
  const scrapedDeals = await crawlerOrchestrator.runAllScanners();
  let ingestedCount = 0;

  for (const raw of scrapedDeals) {
    const discountPct = Number(
      (((raw.regularPrice - raw.currentPrice) / raw.regularPrice) * 100).toFixed(2)
    );
    const unitPrice = raw.packageUnits > 1
      ? Number((raw.currentPrice / raw.packageUnits).toFixed(2))
      : raw.currentPrice;

    const isPriceBug = discountPct >= 65.0;

    const processedDeal: ProcessedDeal = {
      ...raw,
      id: `deal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      discountPct,
      unitPrice,
      isPriceBug,
      capturedAt: new Date()
    };

    liveDealsFeed.unshift(processedDeal);
    broadcastToClients(processedDeal);
    matchAndTriggerAlerts(processedDeal).catch(console.error);
    ingestedCount++;
  }

  return res.json({
    message: `Varredura concluída com sucesso! ${ingestedCount} ofertas foram ingeridas no feed nacional.`,
    totalIngested: ingestedCount
  });
});

// Realiza uma varredura inicial assim que o servidor liga
setTimeout(() => {
  crawlerOrchestrator.runAllScanners().then(deals => {
    deals.forEach(raw => {
      const discountPct = Number((((raw.regularPrice - raw.currentPrice) / raw.regularPrice) * 100).toFixed(2));
      const unitPrice = raw.packageUnits > 1 ? Number((raw.currentPrice / raw.packageUnits).toFixed(2)) : raw.currentPrice;
      const isPriceBug = discountPct >= 65.0;
      liveDealsFeed.push({
        ...raw,
        id: `deal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        discountPct,
        unitPrice,
        isPriceBug,
        capturedAt: new Date()
      });
    });
    console.log(`⚡ [Bootstrap] Feed inicial populado com ${liveDealsFeed.length} ofertas cobrindo todo o Brasil.`);
  });
}, 1000);

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 [RadarPromo API] Rodando na porta ${PORT}`);
  console.log(`📡 [WebSocket] Servidor de tempo real ativo em ws://localhost:${PORT}`);
  console.log(`⚡ [Rotas Disponíveis]:`);
  console.log(`   - POST /api/ingest             (Ingestão de Ofertas)`);
  console.log(`   - GET  /api/deals              (Feed com Filtros)`);
  console.log(`   - POST /api/alerts             (Criar Radar)`);
  console.log(`   - GET  /api/alerts             (Listar Radares)`);
  console.log(`   - GET  /api/crawlers/engines   (Listar Motores)`);
  console.log(`   - POST /api/crawlers/scan-now  (Varredura Massiva Imediata)`);
});
