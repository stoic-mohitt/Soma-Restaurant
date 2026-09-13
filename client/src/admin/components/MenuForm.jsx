import { useState } from "react"
import { X } from "lucide-react"

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "Small Plates",
  vegetarian: false,
  spiceLevel: 0,
  tags: "",
  featured: false,
  image: "",
}

const categories = [
  "Small Plates",
  "Mains",
  "Breads",
  "Desserts",
]

export default function MenuForm({
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [form, setForm] = useState(
    initialData
      ? {
          ...initialData,
          tags: initialData.tags?.join(", ") || "",
        }
      : initialForm
  )

  const [submitting, setSubmitting] =
    useState(false)

  const [error, setError] = useState("")

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")

    if (!form.name.trim()) {
      setError("Dish name is required.")
      return
    }

    if (!form.description.trim()) {
      setError("Description is required.")
      return
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Please enter a valid price.")
      return
    }

    if (!form.image.trim()) {
      setError("Image URL is required.")
      return
    }

    const menuItem = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      vegetarian: form.vegetarian,
      spiceLevel: Number(form.spiceLevel),
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      featured: form.featured,
      image: form.image.trim(),
    }

    try {
      setSubmitting(true)

      await onSubmit(menuItem)

    } catch (error) {
      console.error(
        "Failed to save menu item:",
        error
      )

      setError(
        error?.response?.data?.message ||
          "Failed to save menu item."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#29251f]/40 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#ded5c8] bg-[#fffdf8] shadow-xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#ded5c8] bg-[#fffdf8] px-6 py-5">

          <div>
            <h2 className="text-xl font-medium">
              {initialData
                ? "Edit Dish"
                : "Add Dish"}
            </h2>

            <p className="mt-1 text-xs text-[#756f64]">
              {initialData
                ? "Update this menu item."
                : "Add a new dish to the Sōma menu."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5c8] transition hover:bg-[#f7f1e7]"
          >
            <X size={17} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Dish Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Smoked Paneer Tikka"
              className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the dish..."
              className="w-full resize-none rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
            />
          </div>

          {/* Price + Category */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#756f64]">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="1"
                  placeholder="390"
                  className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[#8a6a4a]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-[#8a6a4a]"
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>

          </div>

          {/* Vegetarian + Featured */}
          <div className="grid gap-4 sm:grid-cols-2">

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#ded5c8] px-4 py-3">

              <input
                type="checkbox"
                name="vegetarian"
                checked={form.vegetarian}
                onChange={handleChange}
                className="h-4 w-4 accent-[#29251f]"
              />

              <span className="text-sm">
                Vegetarian
              </span>

            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#ded5c8] px-4 py-3">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-[#29251f]"
              />

              <span className="text-sm">
                Featured dish
              </span>

            </label>

          </div>

          {/* Spice Level */}
          <div>
            <label className="mb-3 block text-sm font-medium">
              Spice Level
            </label>

            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map(
                (level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        spiceLevel: level,
                      }))
                    }
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition ${
                      form.spiceLevel === level
                        ? "border-[#29251f] bg-[#29251f] text-[#fffdf8]"
                        : "border-[#ded5c8] hover:bg-[#f7f1e7]"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}
            </div>

            <p className="mt-2 text-xs text-[#756f64]">
              0 = no spice · 4 = very spicy
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="creamy, popular, smoky"
              className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
            />

            <p className="mt-2 text-xs text-[#756f64]">
              Separate tags with commas.
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
            />

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-4 h-40 w-full rounded-xl object-cover"
              />
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-[#ded5c8] pt-6">

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#ded5c8] px-5 py-2.5 text-sm transition hover:bg-[#f7f1e7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#29251f] px-6 py-2.5 text-sm text-[#fffdf8] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : initialData
                ? "Save Changes"
                : "Add Dish"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}