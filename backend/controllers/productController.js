const Product = require('../models/Product');

// GET /api/products - Get all products (with optional search)
const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/products/:id - Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/products - Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name || !category || !price || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const product = await Product.create({ name, category, price, description });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
