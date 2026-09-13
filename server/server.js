const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/dbConfig")

const menuRoutes =
  require("./routes/menuRoutes")

const authRoutes =
  require("./routes/authRoutes")

const reservationRoutes =
  require("./routes/reservationRoutes")

const aiRoutes =
  require("./routes/aiRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use(
  "/api/menu",
  menuRoutes
)

app.use(
  "/api/auth",
  authRoutes
)

app.use(
  "/api/reservations",
  reservationRoutes
)

app.use(
  "/api/ai",
  aiRoutes
)

app.get("/", (req, res) => {
  res.json({
    message: "Sōma API is running",
  })
})

const PORT =
  process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(
      `Sōma server running on http://localhost:${PORT}`
    )
  })
}

startServer()