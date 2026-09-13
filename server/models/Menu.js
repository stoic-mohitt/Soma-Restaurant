const mongoose = require("mongoose")

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Small Plates",
        "Mains",
        "Breads",
        "Desserts",
      ],
    },

    vegetarian: {
      type: Boolean,
      default: false,
    },

    spiceLevel: {
      type: Number,
      min: 0,
      max: 4,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },
    image: {
  type: String,
  required: true,
},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Menu", menuSchema)