const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminOnly = require(
  "../middleware/roleMiddleware"
);

const {
  stockIn,
  stockOut,
  getLogs,
} = require(
  "../controllers/inventoryController"
);

router.post(
  "/stock-in",
  authMiddleware,
  adminOnly,
  stockIn
);

router.post(
  "/stock-out",
  authMiddleware,
  adminOnly,
  stockOut
);

router.get(
  "/logs",
  authMiddleware,
  getLogs
);

module.exports = router;