import { DealCrawlerEngine, ScrapedRawDeal } from './base.engine.js';
import {
  DepartmentAndMarketplacesEngine,
  TopWholesaleAndFoodEngine,
  HardwareAndTechEngine,
  FashionAndSportsEngine,
  PharmaciesAndBeautyEngine,
  ConstructionAndPetEngine,
  PriceBugsAndClearanceEngine
} from './engines.js';
import { SocialAndCommunityEngine } from './social.engine.js';

export class CrawlerOrchestrator {
  private engines: DealCrawlerEngine[] = [];

  constructor() {
    this.registerEngine(new DepartmentAndMarketplacesEngine());
    this.registerEngine(new TopWholesaleAndFoodEngine());
    this.registerEngine(new HardwareAndTechEngine());
    this.registerEngine(new FashionAndSportsEngine());
    this.registerEngine(new PharmaciesAndBeautyEngine());
    this.registerEngine(new ConstructionAndPetEngine());
    this.registerEngine(new PriceBugsAndClearanceEngine());
    this.registerEngine(new SocialAndCommunityEngine());
  }

  registerEngine(engine: DealCrawlerEngine) {
    this.engines.push(engine);
    console.log(`🔌 [Crawler Orchestrator] Motor registrado: "${engine.name}" (${engine.channel})`);
  }

  getRegisteredEngines() {
    return this.engines.map(e => ({
      id: e.id,
      name: e.name,
      channel: e.channel,
      categories: e.categoryFocus
    }));
  }

  /**
   * Executa todos os motores em paralelo para escanear todo o Brasil
   */
  async runAllScanners(): Promise<ScrapedRawDeal[]> {
    console.log(`🚀 [Crawler Orchestrator] Iniciando varredura em massa com ${this.engines.length} motores simultâneos...`);
    const results = await Promise.all(this.engines.map(async (engine) => {
      try {
        const deals = await engine.scanDeals();
        console.log(`   ✔ Motor "${engine.name}": ${deals.length} ofertas capturadas.`);
        return deals;
      } catch (err) {
        console.error(`   ❌ Falha no motor "${engine.name}":`, err);
        return [];
      }
    }));

    const allDeals = results.flat();
    console.log(`🏁 [Varredura Completa] Total de ofertas consolidadas: ${allDeals.length}`);
    return allDeals;
  }
}
