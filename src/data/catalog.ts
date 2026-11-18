export type TabId = 'home' | 'about' | 'product' | 'contact';

export type ProductCategory = 'All' | 'Agro & Spices' | 'Industrial' | 'Textiles';

export interface TradeProduct {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  hsCode: string;
  origin: string;
  moq: string;
  fobPrice: string;
  packaging: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const COMPANY_INFO = {
  brandName: 'Fortune Overseas',
  tagline: 'Global Import & Export Trading House',
  addressLine1: 'Thatwade, Pimpri-Chinchwad',
  addressLine2: 'Pune 411033, Maharashtra, India',
  fullAddress: 'Thatwade, Pimpri-Chinchwad, Pune 411033, Maharashtra, India',
  whatsappDisplay: '+91 7249591154',
  whatsappDigits: '917249591154',
  portAccess: 'Nhava Sheva (JNPT) & Mumbai Air Cargo',
  businessHours: 'Monday – Saturday · 09:30 AM – 06:30 PM IST',
} as const;

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_maritime_port_1795018658129.jpg',
  alt: 'Container ship docked along an international maritime freight terminal at sunrise',
};

export const ABOUT_IMAGE = {
  src: '/src/assets/images/about_trade_logistics_1795018662167.jpg',
  alt: 'Organized export inspection center and palletized shipping crates at Fortune Overseas logistics partner facility',
};

export const TRADE_METRICS = [
  { value: '05', label: 'Core Export Lines' },
  { value: '28+', label: 'Destination Ports' },
  { value: '100%', label: 'Pre-Shipment Inspection' },
  { value: 'FOB / CIF', label: 'Global Incoterms' },
] as const;

export const CAPABILITY_PILLARS = [
  {
    number: '01.',
    title: 'Direct Farm & Factory Sourcing',
    detail:
      'Procurement directly from certified agricultural mills, spice growers, textile spinners, and Pimpri-Chinchwad precision machine shops.',
  },
  {
    number: '02.',
    title: 'Export Compliance & Documentation',
    detail:
      'End-to-end handling of Commercial Invoices, Packing Lists, Certificates of Origin, Phytosanitary clearances, and SGS quality checks.',
  },
  {
    number: '03.',
    title: 'Containerized Sea & Air Dispatch',
    detail:
      'Consolidated LCL and full 20ft/40ft FCL shipments dispatched via Nhava Sheva (JNPT) and Pune/Mumbai air cargo corridors.',
  },
] as const;

export const PRODUCTS: TradeProduct[] = [
  {
    id: 'golden-sella-basmati',
    name: '1121 Golden Sella Basmati Rice',
    category: 'Agro & Spices',
    hsCode: 'HS 1006.30',
    origin: 'Punjab & Haryana, India',
    moq: '24 MT (1 × 20ft FCL)',
    fobPrice: '$1,080 / MT',
    packaging: '25 kg / 50 kg PP & Jute Bags',
    description:
      'Extra-long grain parboiled 1121 Golden Sella aged 18 months for firm texture, zero breakage, and uniform elongation after cooking.',
    image: '/src/assets/images/product_basmati_rice_1795018658488.jpg',
    imageAlt: 'Extra-long grain Golden Sella Basmati Rice in woven burlap export bag and stoneware bowl',
  },
  {
    id: 'whole-turmeric-spices',
    name: 'Whole Turmeric Fingers & Cardamom',
    category: 'Agro & Spices',
    hsCode: 'HS 0910.30',
    origin: 'Sangli & Erode, India',
    moq: '5 MT',
    fobPrice: '$2,150 / MT',
    packaging: '25 kg Multi-Wall Craft Bags',
    description:
      'Single-origin sun-dried Salem turmeric fingers with 3.5%–5.0% curcumin content paired with bold 8mm green cardamom pods.',
    image: '/src/assets/images/product_turmeric_spices_1795018658311.jpg',
    imageAlt: 'Whole dried Indian turmeric fingers and green cardamom pods in a ceramic tray',
  },
  {
    id: 'cnc-brass-valves',
    name: 'CNC Precision Brass & SS Valves',
    category: 'Industrial',
    hsCode: 'HS 8481.80',
    origin: 'Pimpri-Chinchwad, Pune',
    moq: '500 Units',
    fobPrice: '$14.50 / Unit',
    packaging: 'VCI Anti-Rust Export Cartons',
    description:
      'Precision-machined C36000 brass ball valves and SS316 threaded fittings pressure-tested to 600 WOG for global fluid control buyers.',
    image: '/src/assets/images/product_cnc_valves_1795018659102.jpg',
    imageAlt: 'Precision CNC-machined solid brass ball valves and stainless steel industrial fittings',
  },
  {
    id: 'organic-cotton-yarn',
    name: 'Organic Combed Cotton Yarn & Twill',
    category: 'Textiles',
    hsCode: 'HS 5205.21',
    origin: 'Maharashtra & Gujarat, India',
    moq: '10 MT',
    fobPrice: '$3,420 / MT',
    packaging: 'Palletized Cone Cartons',
    description:
      'GOTS-compliant 30s & 40s ring-spun combed organic cotton cones and unbleached raw twill fabrics engineered for high-speed looms.',
    image: '/src/assets/images/product_cotton_yarn_1795018659884.jpg',
    imageAlt: 'Natural undyed organic combed cotton yarn cones and raw twill fabric swatches',
  },
  {
    id: 'dehydrated-onion-garlic',
    name: 'Dehydrated Onion Flakes & Garlic',
    category: 'Agro & Spices',
    hsCode: 'HS 0712.20',
    origin: 'Mahuva & Nashik, India',
    moq: '5 MT',
    fobPrice: '$1,890 / MT',
    packaging: '20 kg Poly-Lined Corrugated Boxes',
    description:
      'Low-moisture (<5%) crisp white dehydrated onion kibbled flakes and 100-mesh garlic powder for international food processors.',
    image: '/src/assets/images/product_dehydrated_onion_1795018659876.jpg',
    imageAlt: 'Crisp dehydrated onion flakes and fine white garlic powder in clear sample jars',
  },
];

export function buildWhatsAppUrl(product?: TradeProduct | null, customNote?: string): string {
  const baseMessage = product
    ? `Hello Fortune Overseas (Thatwade, Pimpri-Chinchwad, Pune 411033), I would like to buy / request an export quote for: ${product.name} (${product.hsCode}, MOQ: ${product.moq}).`
    : `Hello Fortune Overseas (Thatwade, Pimpri-Chinchwad, Pune 411033), I would like to discuss an import/export trade inquiry.`;

  const fullMessage = customNote ? `${baseMessage}\n\nDetails: ${customNote}` : baseMessage;
  return `https://wa.me/${COMPANY_INFO.whatsappDigits}?text=${encodeURIComponent(fullMessage)}`;
}
