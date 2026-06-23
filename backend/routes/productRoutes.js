const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/roleMiddleware"
);

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require(
  "../controllers/productController"
);

// Create Product
router.post(
  "/",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  createProduct
);

// Get All Products
router.get(
  "/",
  authMiddleware,
  getProducts
);

// Get Product By ID
router.get(
  "/:id",
  authMiddleware,
  getProductById
);

// Update Product
router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteProduct
);

module.exports = router;