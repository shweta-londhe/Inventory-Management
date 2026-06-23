const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require(
  "../controllers/categoryController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/roleMiddleware"
);

// Create Category

router.post(
  "/",
  authMiddleware,
  adminOnly,
  createCategory
);

// Get Categories

router.get(
  "/",
  authMiddleware,
  getCategories
);

// Update Category

router.put(
  "/:id",
  authMiddleware,
  adminOnly,
  updateCategory
);

// Delete Category

router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deleteCategory
);

module.exports = router;