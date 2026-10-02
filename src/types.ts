import { z } from 'zod';

export const DealIngestSchema = z.object({
  title: z.string().min(3),
  ean: z.string().optional(),
  brand: z.string().optional(),
  category: z.string().default('geral'),
  channel: z.enum(['retail', 'wholesale', 'both']),
  storeName: z.string(),
  regularPrice: z.number().positive(),
  currentPrice: z.number().positive(),
  packageUnits: z.number().int().positive().default(1),
  offerUrl: z.string().url(),
  imageUrl: z.string().url().optional(),
  
  // Abrangência Geográfica (IBGE)
  coverage: z.object({
    isNational: z.boolean().default(true),
    stateUf: z.string().length(2).optional(), // 'SP', 'RJ', etc.
    cityName: z.string().optional(),
    ibgeCode: z.number().optional()
  }),
  
  // Frete
  shipping: z.object({
    isFree: z.boolean().default(false),
    price: z.number().min(0).default(0)
  }),

  couponCode: z.string().optional(),
  
  // Auditoria de Preço & Selo Anti-Fraude
  audit: z.object({
    status: z.enum(['VERIFIED_REAL', 'FAIR_PRICE', 'INFLATED_FAKE', 'PRICE_BUG']).default('VERIFIED_REAL'),
    avgPrice90d: z.number().positive().optional(),
    lowestPrice90d: z.number().positive().optional(),
    confidenceScore: z.number().min(0).max(100).default(98),
    auditMessage: z.string().optional()
  }).optional()
});

export type DealIngestDTO = z.infer<typeof DealIngestSchema>;

export const CreateAlertRuleSchema = z.object({
  userId: z.string().uuid().default(() => '00000000-0000-0000-0000-000000000001'),
  title: z.string().min(2),
  searchKeywords: z.string().optional(),
  ean: z.string().optional(),
  targetChannel: z.enum(['retail', 'wholesale', 'both']).default('both'),
  minDiscountPct: z.number().min(1).max(99).default(15),
  maxPrice: z.number().positive().optional(),
  requireFreeShipping: z.boolean().default(false),
  scopeLevel: z.enum(['national', 'state', 'city']).default('national'),
  stateUf: z.string().length(2).optional(),
  cityName: z.string().optional(),
  
  // Notificações
  channels: z.array(z.enum(['push', 'telegram', 'whatsapp'])).default(['push']),
  telegramChatId: z.string().optional(),
  whatsappPhone: z.string().optional()
});

export type CreateAlertRuleDTO = z.infer<typeof CreateAlertRuleSchema>;
