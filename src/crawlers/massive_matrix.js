    // MATRIZ COMPLETA DE PRODUTOS MULTI-NICHOS PARA TODOS OS ESTADOS E MUNICÍPIOS
    const MASSIVE_LOCAL_TEMPLATES = [
      // 1. ELETRÔNICOS & INFORMÁTICA
      { title: 'Smart TV 65" 4K UHD Samsung CU8000', cat: 'eletronicos', chan: 'retail', reg: 4299, cur: 2499, un: 1, ean: '7892509124431', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60', stores: ['Magazine Luiza', 'Casas Bahia', 'Havan', 'Fast Shop'] },
      { title: 'Placa de Vídeo RTX 4070 Super 12GB GDDR6X', cat: 'eletronicos', chan: 'retail', reg: 4799, cur: 3499, un: 1, ean: '4711387501019', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60', stores: ['Pichau Informática', 'KaBuM!', 'TerabyteShop'] },
      { title: 'Notebook Dell Inspiron 15 Core i7 16GB 512GB SSD', cat: 'eletronicos', chan: 'retail', reg: 4999, cur: 3299, un: 1, ean: '7899864901012', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60', stores: ['Dell Oficial', 'Magazine Luiza', 'Fast Shop'] },
      { title: 'Smartphone Samsung Galaxy S24 258GB 5G', cat: 'eletronicos', chan: 'retail', reg: 5999, cur: 3799, un: 1, ean: '7892509129999', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=60', stores: ['Samsung Store', 'Mercado Livre', 'Havan'] },
      { title: 'Monitor Gamer 27" 165Hz 1ms IPS FreeSync', cat: 'eletronicos', chan: 'retail', reg: 1699, cur: 899, un: 1, ean: '7898620001011', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60', stores: ['Pichau Informática', 'KaBuM!'] },
      
      // 2. ALIMENTOS, BEBIDAS & ATACADO (FARDOS/LOTES)
      { title: 'Cerveja Heineken Puro Malte 350ml (Fardo c/ 24 latas)', cat: 'alimentos', chan: 'wholesale', reg: 144, cur: 86.16, un: 24, ean: '7896045505411', img: 'https://images.unsplash.com/photo-1608270199047-9f7ec058288a?w=500&auto=format&fit=crop&q=60', stores: ['Sam\'s Club', 'Atacadão', 'Assaí Atacadista', 'Grupo Mateus'] },
      { title: 'Arroz Tipo 1 Camil 5kg (Fardo c/ 6 pacotes - 30kg)', cat: 'alimentos', chan: 'wholesale', reg: 198, cur: 129, un: 6, ean: '7896006700019', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60', stores: ['Atacadão', 'Assaí Atacadista', 'Supermercados BH', 'Max Atacadista'] },
      { title: 'Café Tradicional Pilão 500g (Caixa com 20 un)', cat: 'alimentos', chan: 'wholesale', reg: 480, cur: 298, un: 20, ean: '7891095000147', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop&q=60', stores: ['Grupo Mateus Atacarejo', 'Martins B2B', 'Assaí'] },
      { title: 'Óleo de Soja Soya 900ml (Caixa fechada com 20 un)', cat: 'alimentos', chan: 'wholesale', reg: 140, cur: 88, un: 20, ean: '7891048035011', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60', stores: ['Assaí Atacadista', 'Atacadão', 'Komprão Koch'] },
      { title: 'Leite Condensado Nestlé Moça 395g (Caixa c/ 24 latas)', cat: 'alimentos', chan: 'wholesale', reg: 192, cur: 118, un: 24, ean: '7891000100108', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60', stores: ['Sam\'s Club', 'Supermercados BH', 'Grupo Mateus'] },
      { title: 'Sabão em Pó OMO Lavagem Perfeita 1.6kg (Fardo c/ 8 un)', cat: 'alimentos', chan: 'wholesale', reg: 184, cur: 112, un: 8, ean: '7891150064501', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=60', stores: ['Atacadão', 'Assaí', 'Max Atacadista'] },

      // 3. CASA, MÓVEIS & ELETRODOMÉSTICOS
      { title: 'Fritadeira Airfryer Mondial Family 4L Inox 1500W', cat: 'casa', chan: 'retail', reg: 499, cur: 229, un: 1, ean: '7899882306124', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60', stores: ['Havan', 'Magazine Luiza', 'Casas Bahia'] },
      { title: 'Geladeira Brastemp Frost Free Duplex 375L Inox', cat: 'casa', chan: 'retail', reg: 3899, cur: 2399, un: 1, ean: '7891129252014', img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60', stores: ['Casas Bahia', 'Magazine Luiza', 'Fast Shop'] },
      { title: 'Robô Aspirador WAP Robot W300 Bivolt Automático', cat: 'casa', chan: 'retail', reg: 799, cur: 449, un: 1, ean: '7899831301019', img: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=500&auto=format&fit=crop&q=60', stores: ['Havan', 'Americanas.com', 'Mercado Livre'] },
      { title: 'Lava e Seca Midea 11kg HealthGuard Smart Conectada', cat: 'casa', chan: 'retail', reg: 3699, cur: 2299, un: 1, ean: '7898554870012', img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&auto=format&fit=crop&q=60', stores: ['Casas Bahia', 'Amazon Brasil', 'Havan'] },
      { title: 'Furadeira e Parafusadeira Bosch GSB 180-LI c/ 2 Baterias', cat: 'casa', chan: 'retail', reg: 899, cur: 479, un: 1, ean: '3165140889201', img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=60', stores: ['Leroy Merlin', 'Telhanorte', 'Lojas Quero-Quero'] },
      { title: 'Ração Premier Formula Cães Adultos 15kg (Lote c/ 2 sacos)', cat: 'casa', chan: 'wholesale', reg: 590, cur: 359, un: 2, ean: '7897348201019', img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60', stores: ['Petz Atacado', 'Cobasi B2B'] },

      // 4. FARMÁCIA, SAÚDE & COSMÉTICOS
      { title: 'Fralda Pampers Confort Sec Mega Bag Tam G (120 un)', cat: 'farmacia', chan: 'retail', reg: 189.90, cur: 99.90, un: 1, ean: '7500435130101', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60', stores: ['Droga Raia', 'Drogasil', 'Farmácias Pague Menos', 'Panvel'] },
      { title: 'Whey Protein Isolado 100% Dux Nutrition 900g', cat: 'farmacia', chan: 'retail', reg: 249.90, cur: 149.90, un: 1, ean: '7898641750011', img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop&q=60', stores: ['Drogasil', 'Droga Raia', 'Pague Menos'] },
      { title: 'Protetor Solar La Roche-Posay Anthelios FPS 80', cat: 'farmacia', chan: 'retail', reg: 109.90, cur: 62.90, un: 1, ean: '7899706180329', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=60', stores: ['Farmácias Pague Menos', 'Drogasil', 'Drogaria São Paulo'] },
      { title: 'Perfume Malbec Desodorante Colônia 100ml', cat: 'farmacia', chan: 'retail', reg: 199.90, cur: 129.90, un: 1, ean: '7891033001019', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&auto=format&fit=crop&q=60', stores: ['O Boticário', 'Beleza na Web'] },

      // 5. MODA, CALÇADOS & ESPORTES
      { title: 'Tênis Nike Air Zoom Pegasus 40 Masculino Corrida', cat: 'moda', chan: 'retail', reg: 999, cur: 499, un: 1, ean: '196607981011', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60', stores: ['Netshoes', 'Centauro', 'Nike Oficial'] },
      { title: 'Tênis Adidas Ultraboost Light Masculino Performance', cat: 'moda', chan: 'retail', reg: 1199, cur: 599, un: 1, ean: '4066749101019', img: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&auto=format&fit=crop&q=60', stores: ['Centauro', 'Netshoes'] },
      { title: 'Kit com 10 Camisetas Básicas 100% Algodão Hering', cat: 'moda', chan: 'wholesale', reg: 590, cur: 199, un: 10, ean: '7891234500999', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60', stores: ['Hering B2B', 'Lojas Renner', 'C&A Brasil'] },
      { title: 'Jaqueta Puffer Forrada Térmica Impermeável', cat: 'moda', chan: 'retail', reg: 399, cur: 179, un: 1, ean: '7899882211019', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=60', stores: ['Lojas Renner', 'Riachuelo', 'C&A'] },

      // 6. AUTOMOTIVO & PNEUS
      { title: 'Kit 4 Pneus Aro 15 Michelin Primacy 4 195/60R15', cat: 'automotivo', chan: 'wholesale', reg: 2490, cur: 1490, un: 4, ean: '3528701234567', img: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&auto=format&fit=crop&q=60', stores: ['PneuStore Atacado', 'DPaschoal'] },
      { title: 'Bateria Automotiva Moura 60Ah M60GD Sem Manutenção', cat: 'automotivo', chan: 'retail', reg: 580, cur: 349, un: 1, ean: '7896452101019', img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=60', stores: ['DPaschoal', 'MercadoCar', 'AutoZone'] },
      { title: 'Óleo Motor 5W30 Sintético Mobil Super (Caixa c/ 12L)', cat: 'automotivo', chan: 'wholesale', reg: 480, cur: 264, un: 12, ean: '7891048099881', img: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=500&auto=format&fit=crop&q=60', stores: ['Distribuidora Lubrificantes B2B', 'PneuStore'] }
    ];

    function generateInitialMassiveDeals() {
      const ufs = Object.keys(CITIES_BY_UF);
      const generated = [];
      let dealCounter = 1;

      // 1. GERAÇÃO DINÂMICA DE OFERTAS DENSAS PARA CADA MUNICÍPIO E ESTADO
      ufs.forEach((uf) => {
        const cities = CITIES_BY_UF[uf];
        
        cities.forEach((city) => {
          // Para CADA cidade de CADA estado, injetamos pelo menos 18 a 25 ofertas de TODOS os nichos
          MASSIVE_LOCAL_TEMPLATES.forEach((item, tIdx) => {
            const discountPct = Math.round(((item.reg - item.cur) / item.reg) * 100);
            const store = item.stores[tIdx % item.stores.length];
            const isPriceBug = discountPct >= 65;

            generated.push({
              id: `deal-${uf}-${city.toLowerCase().replace(/[^a-z0-9]/g, '')}-${dealCounter++}`,
              title: item.title,
              category: item.cat,
              channel: item.chan,
              store: `${store} (${city}/${uf})`,
              currentPrice: item.cur,
              regularPrice: item.reg,
              discountPct,
              packageUnits: item.un,
              unitPrice: Number((item.cur / item.un).toFixed(2)),
              isFreeShipping: tIdx % 2 === 0,
              isPriceBug,
              stateUf: uf,
              cityName: city,
              image: item.img,
              capturedAgo: `${Math.floor(Math.random() * 45) + 2} min atrás`,
              ean: item.ean
            });
          });
        });
      });

      // 2. ADICIONA OFERTAS NACIONAIS E BUGS RASTREADOS EM TEMPO REAL
      generated.unshift({
        id: 'deal-bug-national-1',
        title: '🚨 BUG AUDITADO: Smart TV Samsung 75" Neo QLED 4K 120Hz',
        category: 'eletronicos',
        channel: 'retail',
        store: 'Carrefour Online Brasil',
        regularPrice: 7999.00,
        currentPrice: 1899.00,
        discountPct: 76,
        packageUnits: 1,
        unitPrice: 1899.00,
        isFreeShipping: true,
        isPriceBug: true,
        stateUf: 'ALL',
        cityName: 'Nacional',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60',
        capturedAgo: 'Live (Agora)',
        ean: '7892509888771'
      });

      generated.unshift({
        id: 'deal-bug-national-2',
        title: '🚨 QUEIMA AUDITADA: Lote 50x Camisetas Básicas Algodão 30.1',
        category: 'moda',
        channel: 'wholesale',
        store: 'Hering B2B / Brás Nacional',
        regularPrice: 1500.00,
        currentPrice: 390.00,
        discountPct: 74,
        packageUnits: 50,
        unitPrice: 7.80,
        isFreeShipping: true,
        isPriceBug: true,
        stateUf: 'ALL',
        cityName: 'Nacional',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60',
        capturedAgo: 'Live (Agora)',
        ean: '7891234500999'
      });

      return generated;
    }