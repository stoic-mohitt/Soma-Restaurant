const Menu = require("../models/Menu")

// GET /api/menu
const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    })
  } catch (error) {
    console.error("Error fetching menu:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
    })
  }
}

// GET /api/menu/:id
const getMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      })
    }

    res.status(200).json({
      success: true,
      data: item,
    })
  } catch (error) {
    console.error("Error fetching menu item:", error)

    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
    })
  }
}

// POST /api/menu
const createMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.create(req.body)

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    })
  } catch (error) {
    console.error("Error creating menu item:", error)

    res.status(400).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    })
  }
}

// PUT /api/menu/:id
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    })
  } catch (error) {
    console.error("Error updating menu item:", error)

    res.status(400).json({
      success: false,
      message: "Failed to update menu item",
      error: error.message,
    })
  }
}

// DELETE /api/menu/:id
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id)

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting menu item:", error)

    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
    })
  }
}

module.exports = {
  getMenu,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
}