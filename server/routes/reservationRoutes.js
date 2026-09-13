const express = require("express")

const {
  createReservation,
  getReservations,
  getReservation,
  updateReservationStatus,
} = require("../controllers/reservationController")

const protect = require("../middleware/authMiddleware")

const router = express.Router()

// Public
router.post("/", createReservation)

// Admin only
router.get("/", protect, getReservations)

router.get(
  "/:id",
  protect,
  getReservation
)

router.put(
  "/:id/status",
  protect,
  updateReservationStatus
)

module.exports = router