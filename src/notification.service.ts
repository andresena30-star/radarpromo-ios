import { DealIngestDTO } from './types.js';

interface TelegramSendOptions {
  botToken: string;
  chatId: string;
  deal: DealIngestDTO & { discountPct: number; unitPrice: number; isPriceBug: boolean };
}

interface WhatsAppSendOptions {
  apiKey?: string;
  apiUrl?: string; // Evolution API / Z-API / Baileys
  phone: string;
  deal: DealIngestDTO & { discountPct: number; unitPrice: number; isPriceBug: boolean };
}

export class NotificationService {
  private telegramToken: string;
  private whatsappApiUrl: string;
  private whatsappApiKey: string;

  constructor() {
    this.telegramToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.whatsappApiUrl = process.env.WHATSAPP_API_URL || 'http://localhost:8080';
    this.whatsappApiKey = process.env.WHATSAPP_API_KEY || '';
  }

  /**
   * Formata mensagem rica com emojis, badges e detalhes de atacado/varejo
   */
  private formatDealMessage(deal: any): string {
    const isWholesale = deal.channel === 'wholesale';
    const bugPrefix = deal.isPriceBug ? '🚨 *BUG DE PREÇO DETECTADO* 🚨\n\n' : '⚡ *NOVA OFERTA RASTREADA*\n\n';

    const location = deal.coverage.isNational 
      ? '🇧🇷 Brasil (Nacional)' 
      : `📍 ${deal.coverage.cityName || ''}/${deal.coverage.stateUf || 'SP'}`;

    const frete = deal.shipping.isFree ? '✅ Frete Grátis' : `📦 Frete: R$ ${deal.shipping.price.toFixed(2)}`;

    let priceDetails = `💰 *De:* ~R$ ${deal.regularPrice.toFixed(2)}~\n`;
    priceDetails += `🔥 *Por:* *R$ ${deal.currentPrice.toFixed(2)}* (-${deal.discountPct}% OFF)\n`;

    if (isWholesale && deal.packageUnits > 1) {
      priceDetails += `📦 *Atacado:* Fardo c/ ${deal.packageUnits} un (👉 *R$ ${deal.unitPrice.toFixed(2)} / un*)\n`;
    }

    if (deal.couponCode) {
      priceDetails += `🎟️ *Cupom:* \`${deal.couponCode}\`\n`;
    }

    return `${bugPrefix}` +
      `🏷️ *${deal.title}*\n\n` +
      `${priceDetails}` +
      `🏢 *Loja:* ${deal.storeName}\n` +
      `${frete}\n` +
      `${location}\n\n` +
      `🛒 [Clique aqui para aproveitar a oferta](${deal.offerUrl})`;
  }

  /**
   * Envio via Telegram Bot API
   */
  async sendTelegramAlert(chatId: string, deal: any): Promise<boolean> {
    if (!this.telegramToken) {
      console.log(`[Telegram Mock] Enviando alerta para chat ${chatId}: ${deal.title}`);
      return true;
    }

    try {
      const text = this.formatDealMessage(deal);
      const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: false
        })
      });

      const json = await res.json() as { ok: boolean };
      return json.ok;
    } catch (err) {
      console.error('[Telegram Error]', err);
      return false;
    }
  }

  /**
   * Envio via WhatsApp Gateway (compatível com Evolution API / Z-API / Baileys)
   */
  async sendWhatsAppAlert(phone: string, deal: any): Promise<boolean> {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = this.formatDealMessage(deal);

    if (!this.whatsappApiKey) {
      console.log(`[WhatsApp Mock] Enviando mensagem p/ +${cleanPhone}: ${deal.title} (-${deal.discountPct}%)`);
      return true;
    }

    try {
      const endpoint = `${this.whatsappApiUrl}/message/sendText/radar-session`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.whatsappApiKey
        },
        body: JSON.stringify({
          number: cleanPhone,
          options: {
            delay: 1200,
            presence: 'composing'
          },
          textMessage: {
            text: message
          }
        })
      });

      return res.ok;
    } catch (err) {
      console.error('[WhatsApp Error]', err);
      return false;
    }
  }
}
