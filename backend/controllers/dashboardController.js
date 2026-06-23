const Product = require("../models/Product");
const Category = require("../models/Category");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalCategories =
      await Category.countDocuments();

    const products =
      await Product.find();

    const totalStock =
      products.reduce(
        (sum, product) =>
          sum + product.stock,
        0
      );

    const lowStockProducts =
      await Product.find({
        stock: {
          $gt: 0,
          $lte: 5,
        },
      }).select("name stock");

    const outOfStockProducts =
      await Product.find({
        stock: 0,
      }).select("name stock");

    res.status(200).json({
      totalProducts,
      totalCategories,
      totalStock,

      lowStockCount:
        lowStockProducts.length,

      outOfStockCount:
        outOfStockProducts.length,

      lowStockProducts,
      outOfStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};