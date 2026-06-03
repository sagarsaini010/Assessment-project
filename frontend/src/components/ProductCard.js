import React from 'react';
import { Link } from 'react-router-dom';

const categoryConfig = {
  Furniture:   { color: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-400'  },
  Electronics: { color: 'bg-blue-50 text-blue-700 border-blue-200',      dot: 'bg-blue-400'   },
  Clothing:    { color: 'bg-pink-50 text-pink-700 border-pink-200',       dot: 'bg-pink-400'   },
  Food:        { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400' },
  Sports:      { color: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-400' },
  Books:       { color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-400' },
  Other:       { color: 'bg-slate-50 text-slate-600 border-slate-200',    dot: 'bg-slate-400'  },
};

const ProductCard = ({ product }) => {
  const cfg = categoryConfig[product.category] || categoryConfig.Other;
  const date = new Date(product.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Top accent bar */}
      <div className={`h-1 w-full ${cfg.dot}`} />

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-700 border ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {product.category}
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>

        {/* Name */}
        <h3 className="font-700 text-slate-900 text-base leading-snug">{product.name}</h3>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{product.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="font-mono font-600 text-brand-700 text-lg" style={{fontFamily:'JetBrains Mono'}}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <Link
            to={`/products/${product._id}`}
            className="inline-flex items-center gap-1 text-xs font-600 text-brand-600 hover:text-brand-800 transition-colors"
          >
            View Details
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
