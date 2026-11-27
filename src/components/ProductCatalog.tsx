import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  ProductCategory,
  PRODUCTS,
  TradeProduct,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogProps {
  onBuyNow: (product: TradeProduct) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'Hardware',
  'Vitamin & Pharma',
  'Food Additive',
  'Industrial Grade',
];

export function ProductCatalog({ onBuyNow }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory>('All');

  const visibleProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === selectedCategory);

  return (
    <section
      id="product"
      aria-labelledby="products-heading"
      className="relative py-20 border-t border-slate-200 overflow-hidden"
    >
      {/* Trading background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-slate-50/92" aria-hidden="true" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase mb-2">
              Product Catalog
            </p>
            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
            >
              Hardware &amp; Pharma products for domestic &amp; global export
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Browse our full range of security hardware and pharmaceutical-grade vitamins &amp; chemicals. Available for PAN India supply and international export orders.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter products by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category === 'All' ? `All Products (${PRODUCTS.length})` : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                {/* Unboxed metadata line */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{product.hsCode}</span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900 leading-snug">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                  {product.description}
                </p>

                {/* Specification summary */}
                <dl className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-slate-500">Minimum Order</dt>
                    <dd className="mt-0.5 font-mono tabular-nums font-semibold text-slate-900">
                      {product.moq}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Indicative FOB</dt>
                    <dd className="mt-0.5 font-mono tabular-nums font-semibold text-slate-900">
                      {product.fobPrice}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-slate-500">Origin &amp; Packing</dt>
                    <dd className="mt-0.5 font-medium text-slate-700">
                      {product.origin} · {product.packaging}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onBuyNow(product)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
