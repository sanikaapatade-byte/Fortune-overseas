import { useState } from 'react';
import {
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  COMPANY_INFO,
  TradeProduct,
} from '../data/catalog';

interface ContactSectionProps {
  selectedProduct: TradeProduct | null;
  onSelectProduct: (product: TradeProduct | null) => void;
  highlightPulse: boolean;
}

export function ContactSection({
  selectedProduct,
  highlightPulse,
}: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);

  const handleCopy = async (text: string, field: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const whatsappDirectHref = buildWhatsAppUrl(selectedProduct);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 border-t border-slate-200 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/src/assets/images/aerial-view-cargo-ship-cargo-container-harbor.jpg')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-900/70" aria-hidden="true" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-blue-400 uppercase mb-2">
            Contact Us &amp; Order Desk
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white [text-wrap:balance]"
          >
            Get in touch for trade inquiries &amp; product sourcing
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Reach our Pune trade desk directly via WhatsApp for domestic orders, import/export quotes or bulk sourcing inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`rounded-xl border p-6 sm:p-8 transition-colors duration-200 ${
                highlightPulse
                  ? 'border-blue-400 bg-white/10'
                  : 'border-white/20 bg-white/10'
              } backdrop-blur-sm`}
            >
              <h3 className="text-lg font-bold text-white">
                {COMPANY_INFO.brandName}
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                {COMPANY_INFO.tagline}
              </p>

              <div className="mt-6 pt-6 border-t border-white/20 space-y-6">
                {/* Address Block */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-blue-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Company Address
                    </p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {COMPANY_INFO.addressLine1}
                    </p>
                    <p className="text-sm text-slate-300 font-mono tabular-nums">
                      {COMPANY_INFO.addressLine2}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(COMPANY_INFO.fullAddress, 'address')}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                    >
                      {copiedField === 'address' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Address copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy office address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Contact Block */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      WhatsApp &amp; Trade Desk
                    </p>
                    <p className="mt-1 text-lg font-bold font-mono tabular-nums text-white">
                      {COMPANY_INFO.whatsappDisplay}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={whatsappDirectHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(COMPANY_INFO.whatsappDisplay, 'phone')}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Number</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
