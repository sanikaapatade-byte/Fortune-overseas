import { useEffect, useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  COMPANY_INFO,
  PRODUCTS,
  TradeProduct,
} from '../data/catalog';

interface ContactSectionProps {
  selectedProduct: TradeProduct | null;
  onSelectProduct: (product: TradeProduct | null) => void;
  highlightPulse: boolean;
}

interface FormState {
  buyerName: string;
  companyName: string;
  email: string;
  phone: string;
  productId: string;
  quantity: string;
  message: string;
}

export function ContactSection({
  selectedProduct,
  onSelectProduct,
  highlightPulse,
}: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    buyerName: '',
    companyName: '',
    email: '',
    phone: '',
    productId: selectedProduct?.id ?? PRODUCTS[0].id,
    quantity: selectedProduct?.moq ?? PRODUCTS[0].moq,
    message: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setSubmittedRef(null);
      setErrorMsg(null);
      setForm((prev) => ({
        ...prev,
        productId: selectedProduct.id,
        quantity: selectedProduct.moq,
        message:
          prev.message.trim() === '' || prev.message.startsWith('Interested in purchasing')
            ? `Interested in purchasing ${selectedProduct.name} (${selectedProduct.hsCode}). Please share FOB/CIF quotation and shipment lead time.`
            : prev.message,
      }));
    }
  }, [selectedProduct]);

  const activeFormProduct =
    PRODUCTS.find((p) => p.id === form.productId) ?? selectedProduct ?? null;

  const handleCopy = async (text: string, field: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!form.buyerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!emailValid && phoneDigits.length < 7) {
      setErrorMsg('Please provide a valid business email or phone number.');
      return;
    }

    const refCode = `FO-${new Date().getFullYear()}-${String(
      Math.floor(1000 + Math.random() * 9000)
    )}`;
    setSubmittedRef(refCode);
  };

  const whatsappDirectHref = buildWhatsAppUrl(
    activeFormProduct,
    form.buyerName
      ? `Buyer: ${form.buyerName}${form.companyName ? ` (${form.companyName})` : ''}, Qty: ${form.quantity || 'Standard MOQ'}`
      : undefined
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 bg-white border-t border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
            Contact Us &amp; Order Desk
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
          >
            Connect with Fortune Overseas for direct trade &amp; export orders
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reach our Pune headquarters directly via WhatsApp or submit your product purchase inquiry below for an itemized FOB/CIF proforma invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Fortune Overseas Official Address & WhatsApp Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`rounded-xl border p-6 sm:p-8 transition-colors duration-200 ${
                highlightPulse
                  ? 'border-blue-600 bg-blue-50/40'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <h3 className="text-lg font-bold text-slate-900">
                {COMPANY_INFO.brandName}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {COMPANY_INFO.tagline}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-6">
                {/* Address Block */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-blue-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Company Address
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {COMPANY_INFO.addressLine1}
                    </p>
                    <p className="text-sm text-slate-700 font-mono tabular-nums">
                      {COMPANY_INFO.addressLine2}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleCopy(COMPANY_INFO.fullAddress, 'address')}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded"
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
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-emerald-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      WhatsApp &amp; Trade Desk
                    </p>
                    <p className="mt-1 text-lg font-bold font-mono tabular-nums text-slate-900">
                      {COMPANY_INFO.whatsappDisplay}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {COMPANY_INFO.businessHours}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <a
                        href={whatsappDirectHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(COMPANY_INFO.whatsappDisplay, 'phone')
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                      >
                        {copiedField === 'phone' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
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

              <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <p>
                  <span className="font-semibold text-slate-800">Dispatch Ports:</span>{' '}
                  {COMPANY_INFO.portAccess}
                </p>
                <p>
                  <span className="font-semibold text-slate-800">Payment Terms:</span>{' '}
                  L/C at Sight, T/T Advance &amp; Export Documentary Collection
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Order & Purchase Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              {selectedProduct && (
                <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-3.5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-blue-800">
                      Selected Product for Purchase Inquiry
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-slate-900">
                      {selectedProduct.name}
                    </p>
                    <p className="mt-0.5 text-xs font-mono tabular-nums text-slate-600">
                      {selectedProduct.hsCode} · MOQ: {selectedProduct.moq} · {selectedProduct.fobPrice}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(null)}
                    aria-label="Clear selected product"
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-blue-100/70 rounded-md transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {submittedRef ? (
                <div className="py-6 space-y-5">
                  <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Inquiry Recorded · Reference {submittedRef}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Thank you, {form.buyerName}.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                    Your inquiry for{' '}
                    <span className="font-semibold text-slate-900">
                      {activeFormProduct?.name ?? 'export products'}
                    </span>{' '}
                    ({form.quantity || 'Standard MOQ'}) has been prepared for our desk at{' '}
                    <span className="font-medium text-slate-800">
                      {COMPANY_INFO.fullAddress}
                    </span>
                    . For fastest confirmation, forward your order directly to our WhatsApp trade desk.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={whatsappDirectHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Order on WhatsApp ({COMPANY_INFO.whatsappDisplay})</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer min-h-[44px]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900">
                      Request Proforma Invoice / Buy Order
                    </h3>
                    <span className="text-xs font-mono text-slate-500">
                      Direct Trade Desk · Pune
                    </span>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 font-medium"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="buyer-name"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="buyer-name"
                        type="text"
                        required
                        value={form.buyerName}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, buyerName: e.target.value }))
                        }
                        placeholder="e.g. Rajesh Kulkarni"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company-name"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Company / Importing Firm
                      </label>
                      <input
                        id="company-name"
                        type="text"
                        value={form.companyName}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, companyName: e.target.value }))
                        }
                        placeholder="e.g. Horizon Global Trading LLC"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="buyer-email"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Business Email *
                      </label>
                      <input
                        id="buyer-email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="procurement@company.com"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="buyer-phone"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="buyer-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="+91 98XXXXXXXX"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 font-mono tabular-nums placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="product-select"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Product Selection
                      </label>
                      <select
                        id="product-select"
                        value={form.productId}
                        onChange={(e) => {
                          const next = PRODUCTS.find((p) => p.id === e.target.value);
                          onSelectProduct(next ?? null);
                          setForm((prev) => ({
                            ...prev,
                            productId: e.target.value,
                            quantity: next?.moq ?? prev.quantity,
                          }));
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      >
                        {PRODUCTS.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} ({product.hsCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="order-qty"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        Required Quantity / Volume
                      </label>
                      <input
                        id="order-qty"
                        type="text"
                        value={form.quantity}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, quantity: e.target.value }))
                        }
                        placeholder="e.g. 1 × 20ft FCL / 10 MT"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 font-mono tabular-nums placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="order-message"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Destination Port &amp; Packaging Notes
                    </label>
                    <textarea
                      id="order-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Specify destination port (FOB/CIF), custom branding, or inspection requirements..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Order Inquiry</span>
                    </button>

                    <a
                      href={whatsappDirectHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
