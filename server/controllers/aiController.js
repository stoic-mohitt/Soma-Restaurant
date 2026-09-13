const axios = require("axios")

const Menu = require("../models/Menu")

const getRecommendations = async (
  req,
  res
) => {
  try {
    const { craving } = req.body

    if (!craving || !craving.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Please tell us what you're craving.",
      })
    }

    // Get the current menu from MongoDB
    const menuItems = await Menu.find()

    if (!menuItems.length) {
      return res.status(404).json({
        success: false,
        message:
          "Our menu is currently unavailable.",
      })
    }

    // Prepare menu for FastAPI
    const menu = menuItems.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      vegetarian: item.vegetarian,
      spiceLevel: item.spiceLevel,
      tags: item.tags,
    }))

    // Send request to FastAPI
    const response = await axios.post(
      "http://localhost:8000/recommend",
      {
        craving,
        menu,
      },
      {
        timeout: 30000,
      }
    )

    res.status(200).json({
      success: true,
      data: response.data.data,
    })

  } catch (error) {
    console.error(
      "AI recommendation error:",
      error.message
    )

    res.status(500).json({
      success: false,
      message:
        "Sōma AI is taking a little break. Please try again.",
    })
  }
}

module.exports = {
  getRecommendations,
}