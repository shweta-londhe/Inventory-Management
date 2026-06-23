const Product = require("../models/Product");

// Create Product

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Products with Search, Filter and Pagination

const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      stock,
      page = 1,
      limit = 7,
    } = req.query;

    let query = {};

    // Search Product Name

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter Category

    if (category) {
      query.category = category;
    }

    // Low Stock

    if (stock === "low") {
      query.stock = {
        $gt: 0,
        $lte: 5,
      };
    }

    // Out Of Stock

    if (stock === "out") {
      query.stock = 0;
    }

    const totalProducts =
      await Product.countDocuments(query);

    const products =
      await Product.find(query)
        .populate("category")
        

    res.status(200).json({
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Product By ID

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    ).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Product

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file && {
          image: req.file.path,
        }),
      },
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Product

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};