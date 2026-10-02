import { DealCrawlerEngine, ScrapedRawDeal } from './base.engine.js';

// Amostragem de Polos Regionais em todos os Estados
const REGIONAL_HUBS = [
  { state: 'SP', city: 'São Paulo', ibge: 3550308 },
  { state: 'SP', city: 'Campinas', ibge: 3509502 },
  { state: 'SP', city: 'Ribeirão Preto', ibge: 3543402 },
  { state: 'RJ', city: 'Rio de Janeiro', ibge: 3304557 },
  { state: 'MG', city: 'Belo Horizonte', ibge: 3106200 },
  { state: 'MG', city: 'Uberlândia', ibge: 3170206 },
  { state: 'RS', city: 'Porto Alegre', ibge: 4314902 },
  { state: 'PR', city: 'Curitiba', ibge: 4106902 },
  { state: 'SC', city: 'Joinville', ibge: 4209102 },
  { state: 'SC', city: 'Florianópolis', ibge: 4205407 },
  { state: 'BA', city: 'Salvador', ibge: 2927408 },
  { state: 'CE', city: 'Fortaleza', ibge: 2304400 },
  { state: 'PE', city: 'Recife', ibge: 2611606 },
  { state: 'MA', city: 'São Luís', ibge: 2111300 },
  { state: 'PA', city: 'Belém', ibge: 1501402 },
  { state: 'AM', city: 'Manaus', ibge: 1302603 },
  { state: 'GO', city: 'Goiânia', ibge: 5208707 },
  { state: 'DF', city: 'Brasília', ibge: 5300108 },
  { state: 'MT', city: 'Cuiabá', ibge: 5103403 },
  { state: 'MS', city: 'Campo Grande', ibge: 5002704 },
  { state: 'ES', city: 'Vitória', ibge: 3205309 },
  { state: 'PB', city: 'João Pessoa', ibge: 2507507 },
  { state: 'RN', city: 'Natal', ibge: 2408102 },
  { state: 'AL', city: 'Maceió', ibge: 2704302 },
  { state: 'PI', city: 'Teresina', ibge: 2211001 },
  { state: 'SE', city: 'Aracaju', ibge: 2800308 },
  { state: 'RO', city: 'Porto Velho', ibge: 1100205 },
  { state: 'TO', city: 'Palmas', ibge: 1721000 },
  { state: 'AC', city: 'Rio Branco', ibge: 1200401 },
  { state: 'AP', city: 'Macapá', ibge: 1600303 },
  { state: 'RR', city: 'Boa Vista', ibge: 1400100 }
];

/**
 * MOTOR 1: Grandes Lojas de Departamento, Eletromóveis & Marketplaces
 * (Magalu, Casas Bahia, Havan, Americanas, Mercado Livre, Amazon, Shopee)
 */
export class DepartmentAndMarketplacesEngine implements DealCrawlerEngine {
  id = 'engine-department-stores';
  name = 'Lojas de Departamento & Marketplaces (Havan, Magalu, Casas Bahia, Americanas, Amazon, ML)';
  channel = 'retail' as const;
  categoryFocus = ['eletronicos', 'casa', 'moda'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const catalogs = [
      { title: 'Smart TV 65" Crystal UHD 4K Samsung CU8000', cat: 'eletronicos', brand: 'Samsung', ean: '7892509124431', reg: 4299, cur: 2499, store: 'Magazine Luiza' },
      { title: 'Geladeira Brastemp Frost Free Duplex 375L Inox', cat: 'casa', brand: 'Brastemp', ean: '7891129252014', reg: 3899, cur: 2399, store: 'Casas Bahia' },
      { title: 'Fritadeira Airfryer Mondial Family 4L Inox 1500W', cat: 'casa', brand: 'Mondial', ean: '7899882306124', reg: 499, cur: 229, store: 'Havan' },
      { title: 'Robô Aspirador de Pó WAP Robot W300 Bivolt', cat: 'casa', brand: 'WAP', ean: '7899831301019', reg: 799, cur: 449, store: 'Americanas.com' },
      { title: 'iPhone 15 Apple 128GB Estelar Tela 6.1" 5G', cat: 'eletronicos', brand: 'Apple', ean: '195949038234', reg: 4999, cur: 3899, store: 'Mercado Livre' },
      { title: 'Lava e Seca Midea 11kg HealthGuard Smart Conectada', cat: 'casa', brand: 'Midea', ean: '7898554870012', reg: 3699, cur: 2299, store: 'Amazon Brasil' },
      { title: 'Jogo de Panelas Tramontina Antiaderente Paris 7 Peças', cat: 'casa', brand: 'Tramontina', ean: '7891112001019', reg: 399, cur: 199, store: 'Havan' }
    ];

    for (const item of catalogs) {
      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: item.cat,
        channel: 'retail',
        storeName: item.store,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: 1,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br/promocao`,
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60',
        coverage: { isNational: true },
        shipping: { isFree: true, price: 0 }
      });
    }
    return deals;
  }
}

/**
 * MOTOR 2: Top Atacarejos, Supermercados e Clubes de Compra B2B
 * (Carrefour, Atacadão, Assaí, Sam's Club, Grupo Mateus, Supermercados BH, Muffato, Koch, Zaffari)
 */
export class TopWholesaleAndFoodEngine implements DealCrawlerEngine {
  id = 'engine-top-wholesale-food';
  name = 'Top Atacarejos & Clubes de Compra (Atacadão, Assaí, Sam\'s Club, Mateus, BH, Muffato, Koch)';
  channel = 'wholesale' as const;
  categoryFocus = ['alimentos', 'bebidas', 'limpeza'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const items = [
      { title: 'Cerveja Heineken Puro Malte 350ml (Fardo com 24 latas)', cat: 'alimentos', brand: 'Heineken', ean: '7896045505411', reg: 144.00, cur: 86.16, un: 24, store: 'Sam\'s Club' },
      { title: 'Arroz Tipo 1 Camil 5kg (Fardo c/ 6 pacotes - 30kg)', cat: 'alimentos', brand: 'Camil', ean: '7896006700019', reg: 198.00, cur: 129.00, un: 6, store: 'Atacadão' },
      { title: 'Óleo de Soja Soya 900ml (Caixa fechada com 20 unidades)', cat: 'alimentos', brand: 'Soya', ean: '7891048035011', reg: 140.00, cur: 88.00, un: 20, store: 'Assaí Atacadista' },
      { title: 'Café Tradicional Pilão 500g (Caixa com 20 pacotes)', cat: 'alimentos', brand: 'Pilão', ean: '7891095000147', reg: 480.00, cur: 298.00, un: 20, store: 'Grupo Mateus Atacarejo' },
      { title: 'Leite Condensado Nestlé Moça 395g (Caixa com 24 latas)', cat: 'alimentos', brand: 'Nestlé', ean: '7891000100108', reg: 192.00, cur: 118.00, un: 24, store: 'Supermercados BH' },
      { title: 'Sabão em Pó OMO Lavagem Perfeita 1.6kg (Fardo com 8 caixas)', cat: 'alimentos', brand: 'OMO', ean: '7891150064501', reg: 184.00, cur: 112.00, un: 8, store: 'Max Atacadista (Muffato)' },
      { title: 'Refrigerante Coca-Cola Original 2L (Pack com 6 garrafas)', cat: 'alimentos', brand: 'Coca-Cola', ean: '7894900011517', reg: 65.00, cur: 39.90, un: 6, store: 'Komprão Koch Atacadista' },
      { title: 'Queijo Mussarela Peça Inteira ~4kg (Preço por Peça Fechada)', cat: 'alimentos', brand: 'Scala', ean: '7896123450011', reg: 190.00, cur: 124.00, un: 1, store: 'Carrefour Atacado' }
    ];

    for (let i = 0; i < REGIONAL_HUBS.length; i++) {
      const hub = REGIONAL_HUBS[i];
      const item = items[i % items.length];

      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: item.cat,
        channel: 'wholesale',
        storeName: `${item.store} (${hub.city}/${hub.state})`,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: item.un,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br/atacado`,
        imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60',
        coverage: {
          isNational: false,
          stateUf: hub.state,
          cityName: hub.city,
          ibgeCode: hub.ibge
        },
        shipping: {
          isFree: i % 2 === 0,
          price: i % 2 === 0 ? 0 : 19.90
        }
      });
    }

    return deals;
  }
}

/**
 * MOTOR 3: Hardware Gamer, Computadores & TI Especializada
 * (KaBuM!, Pichau, TerabyteShop, Fast Shop, Kalunga)
 */
export class HardwareAndTechEngine implements DealCrawlerEngine {
  id = 'engine-hardware-tech';
  name = 'Hardware, Informática & Gamer (Pichau, KaBuM!, TerabyteShop, Fast Shop, Kalunga)';
  channel = 'retail' as const;
  categoryFocus = ['eletronicos'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const catalogs = [
      { title: 'Placa de Vídeo RTX 4070 Super 12GB GDDR6X', reg: 4799, cur: 3499, brand: 'NVIDIA / Asus', ean: '4711387501019', store: 'Pichau Informática' },
      { title: 'Processador AMD Ryzen 7 7800X3D 4.2GHz (5.0GHz Turbo)', reg: 3399, cur: 2399, brand: 'AMD', ean: '0730143314930', store: 'KaBuM!' },
      { title: 'Monitor Gamer Curvo 34" Ultrawide 165Hz 1ms WQHD', reg: 2499, cur: 1499, brand: 'AOC', ean: '7898620001011', store: 'TerabyteShop' },
      { title: 'SSD M.2 NVMe 2TB Kingston KC3000 PCIe 4.0 7000MB/s', reg: 1199, cur: 749, brand: 'Kingston', ean: '0740617324341', store: 'Pichau Informática' },
      { title: 'Notebook Dell Inspiron Intel Core i7 16GB 512GB SSD', reg: 4999, cur: 3399, brand: 'Dell', ean: '7899864901012', store: 'Fast Shop' },
      { title: 'Caixa c/ 10 Pacotes Papel Sulfite A4 Chamex 500 Folhas (5.000 Fls)', reg: 320, cur: 189, brand: 'Chamex', ean: '7891175001017', store: 'Kalunga B2B' }
    ];

    for (const item of catalogs) {
      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: 'eletronicos',
        channel: 'retail',
        storeName: item.store,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: 1,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
        imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60',
        coverage: { isNational: true },
        shipping: { isFree: true, price: 0 }
      });
    }

    return deals;
  }
}

/**
 * MOTOR 4: Moda, Têxtil, Calçados & Artigos Esportivos
 * (Renner, C&A, Riachuelo, Netshoes, Centauro, Zattini, Grupo Soma/Hering)
 */
export class FashionAndSportsEngine implements DealCrawlerEngine {
  id = 'engine-fashion-sports';
  name = 'Moda, Calçados & Esportes (Netshoes, Centauro, Renner, C&A, Riachuelo, Hering)';
  channel = 'both' as const;
  categoryFocus = ['moda'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const catalogs = [
      { title: 'Tênis Nike Air Zoom Pegasus 40 Masculino Corrida', reg: 999, cur: 499, store: 'Netshoes', brand: 'Nike', ean: '196607981011', chan: 'retail' as const, un: 1 },
      { title: 'Tênis Adidas Ultraboost Light Performance', reg: 1199, cur: 599, store: 'Centauro', brand: 'Adidas', ean: '4066749101019', chan: 'retail' as const, un: 1 },
      { title: 'Kit com 10 Camisetas Básicas 100% Algodão Hering', reg: 590, cur: 199, store: 'Hering Oficial', brand: 'Hering', ean: '7891234500999', chan: 'wholesale' as const, un: 10 },
      { title: 'Jaqueta Puffer Forrada Térmica Impermeável', reg: 399, cur: 179, store: 'Lojas Renner', brand: 'Renner', ean: '7899882211019', chan: 'retail' as const, un: 1 },
      { title: 'Lote 5x Calças Jeans Masculinas Slim Fit Premium', reg: 750, cur: 320, store: 'C&A Brasil Atacado', brand: 'C&A', ean: '7891112233445', chan: 'wholesale' as const, un: 5 }
    ];

    for (let i = 0; i < REGIONAL_HUBS.length; i++) {
      const hub = REGIONAL_HUBS[i];
      const item = catalogs[i % catalogs.length];

      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: 'moda',
        channel: item.chan,
        storeName: `${item.store} (${hub.city}/${hub.state})`,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: item.un,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
        coverage: {
          isNational: false,
          stateUf: hub.state,
          cityName: hub.city,
          ibgeCode: hub.ibge
        },
        shipping: { isFree: true, price: 0 }
      });
    }

    return deals;
  }
}

/**
 * MOTOR 5: Farmácias, Cosméticos, Saúde & Beleza
 * (Raia, Drogasil, Pacheco, Pague Menos, Panvel, São João, O Boticário)
 */
export class PharmaciesAndBeautyEngine implements DealCrawlerEngine {
  id = 'engine-pharmacies-beauty';
  name = 'Farmácias & Beleza (Droga Raia, Drogasil, Pacheco, Pague Menos, Panvel, Boticário)';
  channel = 'retail' as const;
  categoryFocus = ['farmacia'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const items = [
      { title: 'Fralda Pampers Confort Sec Mega Bag Tam G (120 un)', reg: 189.90, cur: 99.90, store: 'Droga Raia', brand: 'Pampers', ean: '7500435130101' },
      { title: 'Whey Protein Isolado 100% Dux Nutrition 900g', reg: 249.90, cur: 149.90, store: 'Drogasil', brand: 'Dux', ean: '7898641750011' },
      { title: 'Protetor Solar La Roche-Posay Anthelios Airlicium FPS 80', reg: 109.90, cur: 62.90, store: 'Farmácias Pague Menos', brand: 'La Roche', ean: '7899706180329' },
      { title: 'Perfume Malbec Desodorante Colônia 100ml', reg: 199.90, cur: 129.90, store: 'O Boticário', brand: 'Boticário', ean: '7891033001019' },
      { title: 'Kit Shampoo + Condicionador L\'Oréal Elseve Glycolic Gloss', reg: 59.90, cur: 29.90, store: 'Panvel Farmácias', brand: 'Elseve', ean: '7899706180999' }
    ];

    for (let i = 0; i < REGIONAL_HUBS.length; i++) {
      const hub = REGIONAL_HUBS[i];
      const item = items[i % items.length];

      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: 'farmacia',
        channel: 'retail',
        storeName: `${item.store} ${hub.state}`,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: 1,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
        coverage: {
          isNational: false,
          stateUf: hub.state,
          cityName: hub.city,
          ibgeCode: hub.ibge
        },
        shipping: { isFree: true, price: 0 }
      });
    }

    return deals;
  }
}

/**
 * MOTOR 6: Materiais de Construção, Bricolagem, Pet & Ferramentas
 * (Leroy Merlin, Telhanorte, C&C, Petz, Cobasi, Quero-Quero)
 */
export class ConstructionAndPetEngine implements DealCrawlerEngine {
  id = 'engine-construction-pet';
  name = 'Construção, Pet & Ferramentas (Leroy Merlin, Telhanorte, Petz, Cobasi, Quero-Quero)';
  channel = 'both' as const;
  categoryFocus = ['casa'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    const deals: ScrapedRawDeal[] = [];
    const items = [
      { title: 'Furadeira e Parafusadeira Bosch GSB 180-LI Impacto 18V', reg: 899, cur: 479, store: 'Leroy Merlin', brand: 'Bosch', chan: 'retail' as const, un: 1, ean: '3165140889201' },
      { title: 'Ração Premier Formula Cães Adultos Raças Médias 15kg (Lote c/ 2)', reg: 590, cur: 359, store: 'Petz Atacado', brand: 'Premier', chan: 'wholesale' as const, un: 2, ean: '7897348201019' },
      { title: 'Piso Porcelanato Polido Esmaltado 84x84cm Retificado (Palete 40m²)', reg: 3600, cur: 1990, store: 'Telhanorte Pro', brand: 'Portobello', chan: 'wholesale' as const, un: 40, ean: '7891234598711' },
      { title: 'Kit Torneira Gourmet Monocomando Inox Escovado Extensível', reg: 499, cur: 199, store: 'Lojas Quero-Quero', brand: 'Docol', chan: 'retail' as const, un: 1, ean: '7891234509871' }
    ];

    for (let i = 0; i < REGIONAL_HUBS.length; i++) {
      const hub = REGIONAL_HUBS[i];
      const item = items[i % items.length];

      deals.push({
        title: item.title,
        brand: item.brand,
        ean: item.ean,
        category: 'casa',
        channel: item.chan,
        storeName: `${item.store} (${hub.city}/${hub.state})`,
        regularPrice: item.reg,
        currentPrice: item.cur,
        packageUnits: item.un,
        offerUrl: `https://${item.store.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br`,
        imageUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&auto=format&fit=crop&q=60',
        coverage: {
          isNational: false,
          stateUf: hub.state,
          cityName: hub.city,
          ibgeCode: hub.ibge
        },
        shipping: { isFree: i % 2 === 0, price: i % 2 === 0 ? 0 : 29.90 }
      });
    }

    return deals;
  }
}

/**
 * MOTOR 7: Scanner Especial de Erros de Preço & Queimas de Estoque (>65% OFF)
 */
export class PriceBugsAndClearanceEngine implements DealCrawlerEngine {
  id = 'engine-price-bugs';
  name = 'Scanner Especial de Bugs de Preço & Erros de Cadastro (>65% OFF)';
  channel = 'both' as const;
  categoryFocus = ['eletronicos', 'moda', 'casa', 'alimentos'];

  async scanDeals(): Promise<ScrapedRawDeal[]> {
    return [
      {
        title: '🚨 BUG: Smart TV Samsung 75" Neo QLED 4K 120Hz',
        brand: 'Samsung',
        ean: '7892509888771',
        category: 'eletronicos',
        channel: 'retail',
        storeName: 'Carrefour Online',
        regularPrice: 7999.00,
        currentPrice: 1899.00,
        packageUnits: 1,
        offerUrl: 'https://carrefour.com.br/bug-smart-tv-75',
        imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60',
        coverage: { isNational: true },
        shipping: { isFree: true, price: 0 }
      },
      {
        title: '🚨 QUEIMA: Fardo com 50 Camisetas Básicas 100% Algodão',
        brand: 'Hering Corp',
        ean: '7891234500999',
        category: 'moda',
        channel: 'wholesale',
        storeName: 'Hering B2B Atacado',
        regularPrice: 1500.00,
        currentPrice: 390.00,
        packageUnits: 50,
        offerUrl: 'https://hering.com.br',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
        coverage: { isNational: true },
        shipping: { isFree: true, price: 0 }
      },
      {
        title: '🚨 BUG: Cadeira Gamer Ergonômica Reclinável 180º',
        brand: 'ThunderX3',
        ean: '4713882173456',
        category: 'casa',
        channel: 'retail',
        storeName: 'Pichau Informática',
        regularPrice: 1799.00,
        currentPrice: 429.00,
        packageUnits: 1,
        offerUrl: 'https://pichau.com.br/bug-cadeira-gamer',
        imageUrl: 'https://images.unsplash.com/photo-1580481077197-7340ff494c87?w=500&auto=format&fit=crop&q=60',
        coverage: { isNational: true },
        shipping: { isFree: true, price: 0 }
      }
    ];
  }
}
