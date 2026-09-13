const Reservation = require("../models/Reservation")

// Restaurant capacity per time slot
const RESTAURANT_CAPACITY = 40

// CREATE RESERVATION
// POST /api/reservations
const createReservation = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      guests,
      time,
      message,
    } = req.body

    // Check required fields
    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !guests ||
      !time
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required reservation details.",
      })
    }

    // Convert guests to number
    const guestCount = Number(guests)

    // Validate guest count
    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 20
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Number of guests must be between 1 and 20.",
      })
    }

    // Create date range for the selected calendar day
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    // Find active reservations for the same date and time
    const existingReservations =
      await Reservation.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },

        time,

        status: {
          $in: ["Pending", "Confirmed"],
        },
      })

    // Calculate already booked guests
    const bookedGuests =
      existingReservations.reduce(
        (total, reservation) =>
          total + reservation.guests,
        0
      )

    // Calculate remaining capacity
    const remainingCapacity =
      RESTAURANT_CAPACITY - bookedGuests

    // Reject if there isn't enough capacity
    if (guestCount > remainingCapacity) {
      return res.status(409).json({
        success: false,
        message:
          remainingCapacity > 0
            ? `Sorry, only ${remainingCapacity} seat${
                remainingCapacity === 1
                  ? ""
                  : "s"
              } remain available for ${time}.`
            : `Sorry, we are fully booked for ${time}. Please choose another time.`,
      })
    }

    // Create reservation
    const reservation =
      await Reservation.create({
        name,
        email,
        phone,
        date,
        guests: guestCount,
        time,
        message: message || "",
      })

    // Send success response
    res.status(201).json({
      success: true,
      message:
        "Reservation request submitted successfully.",
      data: reservation,
    })
  } catch (error) {
    console.error(
      "Error creating reservation:",
      error
    )

    res.status(400).json({
      success: false,
      message:
        "Failed to create reservation.",
      error: error.message,
    })
  }
}


// GET ALL RESERVATIONS
// GET /api/reservations
const getReservations = async (req, res) => {
  try {
    const reservations =
      await Reservation.find().sort({
        date: 1,
        time: 1,
      })

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    })
  } catch (error) {
    console.error(
      "Error fetching reservations:",
      error
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch reservations.",
    })
  }
}


// GET SINGLE RESERVATION
// GET /api/reservations/:id
const getReservation = async (req, res) => {
  try {
    const reservation =
      await Reservation.findById(
        req.params.id
      )

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      })
    }

    res.status(200).json({
      success: true,
      data: reservation,
    })
  } catch (error) {
    console.error(
      "Error fetching reservation:",
      error
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch reservation.",
    })
  }
}


// UPDATE RESERVATION STATUS
// PUT /api/reservations/:id/status
const updateReservationStatus =
  async (req, res) => {
    try {
      const { status } = req.body

      const validStatuses = [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ]

      // Validate status
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid reservation status.",
        })
      }

      // Update reservation
      const reservation =
        await Reservation.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
            runValidators: true,
          }
        )

      // Reservation doesn't exist
      if (!reservation) {
        return res.status(404).json({
          success: false,
          message:
            "Reservation not found.",
        })
      }

      res.status(200).json({
        success: true,
        message:
          "Reservation status updated.",
        data: reservation,
      })
    } catch (error) {
      console.error(
        "Error updating reservation:",
        error
      )

      res.status(500).json({
        success: false,
        message:
          "Failed to update reservation.",
      })
    }
  }


// Export controller functions
module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservationStatus,
}