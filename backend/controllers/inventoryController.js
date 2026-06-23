const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");

// STOCK IN

const stockIn = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    product.stock += Number(quantity);

    await product.save();

    await InventoryLog.create({
      product: productId,
      quantity,
      transactionType: "IN",
      updatedBy: req.user.userId,
    });

    res.status(200).json({
      message: "Stock Added Successfully",
      currentStock: product.stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// STOCK OUT

const stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    if (
      product.stock < Number(quantity)
    ) {
      return res.status(400).json({
        message:
          "Insufficient Stock Available",
      });
    }

    product.stock -= Number(quantity);

    await product.save();

    await InventoryLog.create({
      product: productId,
      quantity,
      transactionType: "OUT",
      updatedBy: req.user.userId,
    });

    res.status(200).json({
      message:
        "Stock Removed Successfully",
      currentStock: product.stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET INVENTORY LOGS

const getLogs = async (req, res) => {
  try {
    const logs =
      await InventoryLog.find()
        .populate(
          "product",
          "name stock"
        )
        .populate(
          "updatedBy",
          "name email role"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  stockIn,
  stockOut,
  getLogs,
};