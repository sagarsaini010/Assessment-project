import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreeScene from '../components/ThreeScene';
import { getProductById } from '../services/api';

const categoryConfig = {
  Furniture:   { color: 'bg-amber-50 text-amber-700 border-amber-200',   dot: 'bg-amber-400' },
  Electronics: { color: 'bg-blue-50 text-blue-700 border-blue-200',      dot: 'bg-blue-400'  },
  Clothing:    { color: 'bg-pink-50 text-pink-700 border-pink-200',       dot: 'bg-pink-400'  },
  Food:        { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-400' },
  Sports:      { color: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-400' },
  Books:       { color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-400' },
  Other:       { color: 'bg-slate-100 text-slate-600 border-slate-200',   dot: 'bg-slate-400' },
};

const MetaRow = ({ label, value, mono }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 gap-4">
    <span className="text-xs font-700 uppercase tracking-widest text-slate-400">{label}</span>
    <span className={`text-sm text-slate-700 text-right ${mono ? 'font-mono text-xs text-slate-500 break-all' : 'font-500'}`}>{value}</span>
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.data);
      } catch {
        setError('Product not found or server error.');
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-8 h-8 border-2 border-slate-200 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500">Loading product...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl">⚠️</div>
      <p className="text-sm text-slate-500">{error}</p>
      <Link to="/" className="text-sm font-600 text-brand-600 hover:text-brand-800">← Back to Products</Link>
    </div>
  );

  const cfg = categoryConfig[product.category] || categoryConfig.Other;
  const addedDate = new Date(product.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-600 font-500 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Products
      </Link>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Three.js Panel */}
        <div className="lg:sticky lg:top-24" style={{ minHeight: '420px' }}>
          <ThreeScene category={product.category} />
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-5">
          {/* Category badge */}
          <div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-700 border ${cfg.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {product.category}
            </span>
          </div>

          {/* Name & Price */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight tracking-tight mb-3" style={{fontFamily:'Plus Jakarta Sans'}}>
              {product.name}
            </h1>
            <div className="text-3xl font-extrabold text-brand-600" style={{fontFamily:'JetBrains Mono'}}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
            <h3 className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-2.5">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Meta */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-card">
            <h3 className="text-xs font-700 uppercase tracking-widest text-slate-400 mb-1">Product Details</h3>
            <MetaRow label="Product ID" value={product._id} mono />
            <MetaRow label="Category" value={product.category} />
            <MetaRow label="Added On" value={addedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
