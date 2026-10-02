import { DealIngestDTO } from '../types.js';

export interface ScrapedRawDeal {
  title: string;
  ean?: string;
  brand?: string;
  category: string;
  channel: 'retail' | 'wholesale';
  storeName: string;
  regularPrice: number;
  currentPrice: number;
  packageUnits: number;
  offerUrl: string;
  imageUrl?: string;
  coverage: {
    isNational: boolean;
    stateUf?: string;
    cityName?: string;
    ibgeCode?: number;
  };
  shipping: {
    isFree: boolean;
    price: number;
  };
  couponCode?: string;
}

export interface DealCrawlerEngine {
  id: string;
  name: string;
  channel: 'retail' | 'wholesale' | 'both';
  categoryFocus: string[];
  scanDeals(): Promise<ScrapedRawDeal[]>;
}
