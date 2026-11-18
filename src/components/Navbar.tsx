import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO, TabId } from '../data/catalog';

interface NavbarProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}

const NAV_ITEMS: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'product', label: 'Product' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (tab: TabId) => {
    setMobileOpen(false);
    onNavigate(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleSelect('home');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded"
        >
          {COMPANY_INFO.brandName}
        </a>

        {/* Zone 2: 4 concise single-line text navigation tabs */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-[1px] h-0.5 bg-blue-700 transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            Request Quote
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => handleSelect('contact')}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer min-h-[44px]"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
