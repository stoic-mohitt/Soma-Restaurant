const express = require("express")

const {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

// Public routes
router.get("/", getMenu)
router.get("/:id", getMenuItem)

// Protected admin routes
router.post("/", protect, createMenuItem)
router.put("/:id", protect, updateMenuItem)
router.delete("/:id", protect, deleteMenuItem)

module.exports = router