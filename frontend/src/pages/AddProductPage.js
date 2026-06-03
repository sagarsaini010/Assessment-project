import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';

const CATEGORIES = ['Furniture', 'Electronics', 'Clothing', 'Food', 'Sports', 'Books', 'Other'];

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-700 uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const AddProductPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', category: '', price: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await createProduct({ ...form, price: Number(form.price) });
      setSuccess(true);
      setTimeout(() => navigate(`/products/${res.data._id}`), 1400);
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to create product' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none transition-all ${
      errors[field] ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-50' : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
    }`;

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{fontFamily:'Plus Jakarta Sans'}}>Add New Product</h1>
        <p className="text-sm text-slate-500 mt-1">Fill in the details to add a product to the catalog</p>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-5 text-sm text-emerald-700 font-500">
          <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Product created! Redirecting to product page...
        </div>
      )}

      {/* Submit error */}
      {errors.submit && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl mb-5 text-sm text-red-600 font-500">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {errors.submit}
        </div>
      )}

      {/* Form card */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-card p-6 flex flex-col gap-5">
        <Field label="Product Name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Wooden Chair" className={inputClass('name')} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category" error={errors.category}>
            <select name="category" value={form.category} onChange={handleChange} className={inputClass('category')}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)" error={errors.price}>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 2999" min="0" className={inputClass('price')} />
          </Field>
        </div>

        <Field label="Description" error={errors.description}>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the product..." rows={4} className={`${inputClass('description')} resize-none`} />
        </Field>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-1">
          <button type="button" onClick={() => navigate('/')} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-sm font-600 rounded-xl transition-all">
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} disabled={loading || success} className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-600 rounded-xl transition-all shadow-sm hover:shadow-md">
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
