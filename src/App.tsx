import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { ContactSection } from './components/ContactSection';
import { Navbar } from './components/Navbar';
import { ProductCatalog } from './components/ProductCatalog';
import { ResilientImage } from './components/ResilientImage';
import {
  ABOUT_IMAGE,
  buildWhatsAppUrl,
  CAPABILITY_PILLARS,
  COMPANY_INFO,
  HERO_IMAGE,
  TabId,
  TRADE_METRICS,
  TradeProduct,
} from './data/catalog';

const SECTION_IDS: TabId[] = ['home', 'about', 'product', 'contact'];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(
    null
  );
  const [contactHighlight, setContactHighlight] = useState(false);

  const navigateToSection = (tab: TabId) => {
    setActiveTab(tab);
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBuyNow = (product: TradeProduct) => {
    setSelectedProduct(product);
    setContactHighlight(true);
    navigateToSection('contact');
    window.setTimeout(() => setContactHighlight(false), 1800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as TabId;
          if (SECTION_IDS.includes(id)) {
            setActiveTab(id);
          }
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activeTab={activeTab} onNavigate={navigateToSection} />

      <main className="flex-1">
        {/* Section 1: Home / Hero */}
        <section
          id="home"
          aria-labelledby="hero-heading"
          className="bg-white pt-10 pb-14 lg:pt-14 lg:pb-16"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center py-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 mb-4">
                  <span className="text-blue-700 font-semibold">
                    Import &amp; Export House
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{COMPANY_INFO.addressLine1}, Pune</span>
                </div>

                <h1
                  id="hero-heading"
                  className="font-display font-extrabold tracking-tight text-slate-900 leading-[1.08] [text-wrap:balance]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                >
                  Direct Indian exports &amp; global trade fulfillment
                </h1>

                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-[54ch]">
                  Fortune Overseas sources, inspects, and ships Basmati rice, whole spices, organic cotton textiles, dehydrated ingredients, and CNC brass valves from Pune to commercial buyers worldwide.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigateToSection('product')}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                  >
                    <span>Explore 5 Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateToSection('contact')}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <span>Contact Pune Desk</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="w-full h-64 sm:h-80 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    fallbackLabel="Fortune Overseas Global Maritime Freight"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Trade Strip */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {TRADE_METRICS.map((metric) => (
                <div key={metric.label}>
                  <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: About Us */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-20 bg-white border-t border-slate-200"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-5">
                <div className="w-full h-72 sm:h-88 lg:h-full min-h-[360px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={ABOUT_IMAGE.src}
                    alt={ABOUT_IMAGE.alt}
                    fallbackLabel="Fortune Overseas Quality & Container Operations"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
                  About Us
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
                >
                  Headquartered in Pimpri-Chinchwad, built for global supply chains
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  Operating from <span className="font-semibold text-slate-900">{COMPANY_INFO.fullAddress}</span>, Fortune Overseas bridges Indian producers and manufacturers with importers across the Middle East, Europe, Southeast Asia, and North America. Our strategic location on the Pune–Mumbai logistics corridor ensures rapid container consolidation through {COMPANY_INFO.portAccess}.
                </p>

                <div className="mt-8 divide-y divide-slate-200 border-t border-b border-slate-200">
                  {CAPABILITY_PILLARS.map((pillar) => (
                    <div key={pillar.number} className="py-4 sm:py-5 flex gap-4">
                      <span className="font-mono tabular-nums text-sm font-semibold text-blue-700 shrink-0 pt-0.5">
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {pillar.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                          {pillar.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Product Catalog (5 Products with Buy Now) */}
        <ProductCatalog onBuyNow={handleBuyNow} />

        {/* Section 4: Contact Us */}
        <ContactSection
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
          highlightPulse={contactHighlight}
        />
      </main>

      {/* Quiet Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold text-white tracking-tight">
                {COMPANY_INFO.brandName}
              </p>
              <p className="mt-2 text-sm text-slate-400 max-w-sm leading-relaxed">
                Import and export trading partner delivering agricultural commodities, textiles, and precision-machined industrial hardware worldwide.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Navigation
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToSection('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToSection('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToSection('product')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Product
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigateToSection('contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Head Office &amp; WhatsApp
              </p>
              <p className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.fullAddress}</span>
              </p>
              <p className="flex items-center gap-2 font-mono tabular-nums text-slate-200">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={buildWhatsAppUrl(selectedProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline decoration-slate-600 underline-offset-4"
                >
                  {COMPANY_INFO.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.brandName}. All rights reserved.</p>
            <p>{COMPANY_INFO.addressLine1}, Pune 411033</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
