import { useMemo, useState } from "react"

import {
  Plus,
  Pencil,
  Trash2,
  Leaf,
  Search,
  Star,
} from "lucide-react"

const categories = [
  "All",
  "Small Plates",
  "Mains",
  "Breads",
  "Desserts",
]

export default function MenuManager({
  menuItems,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [deletingId, setDeletingId] =
    useState(null)

  const [search, setSearch] =
    useState("")

  const [category, setCategory] =
    useState("All")

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        category === "All" ||
        item.category === category

      return (
        matchesSearch &&
        matchesCategory
      )
    })
  }, [menuItems, search, category])

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dish?"
    )

    if (!confirmed) return

    try {
      setDeletingId(id)

      await onDelete(id)
    } catch (error) {
      console.error(
        "Failed to delete item:",
        error
      )

      alert("Failed to delete menu item.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#8a6a4a]">
            Management
          </p>

          <h2 className="mt-3 text-4xl font-medium tracking-[-0.04em]">
            Menu
          </h2>

          <p className="mt-2 text-sm text-[#756f64]">
            Add, edit and manage your dishes.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-full bg-[#29251f] px-5 py-3 text-sm text-[#fffdf8] transition hover:opacity-85"
        >
          <Plus size={17} />
          Add Dish
        </button>

      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756f64]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search dishes..."
            className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
          />

        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
          className="rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition focus:border-[#8a6a4a]"
        >
          {categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>

      </div>

      {/* Result count */}
      <p className="mb-4 text-xs text-[#756f64]">
        Showing {filteredItems.length}{" "}
        {filteredItems.length === 1
          ? "dish"
          : "dishes"}
      </p>

      {/* Menu list */}
      <div className="overflow-hidden rounded-2xl border border-[#ded5c8] bg-[#fffdf8]">

        {/* Desktop header */}
        <div className="hidden grid-cols-[2fr_1fr_100px_110px_100px] gap-4 border-b border-[#ded5c8] px-6 py-4 text-xs uppercase tracking-wider text-[#756f64] md:grid">

          <span>Dish</span>

          <span>Category</span>

          <span>Price</span>

          <span>Status</span>

          <span>Actions</span>

        </div>

        {filteredItems.length === 0 ? (
          <div className="px-6 py-20 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f1e7]">
              <Search
                size={19}
                className="text-[#756f64]"
              />
            </div>

            <p className="mt-4 text-sm font-medium">
              No dishes found
            </p>

            <p className="mt-1 text-xs text-[#756f64]">
              Try changing your search or category.
            </p>

          </div>
        ) : (
          <div className="divide-y divide-[#ded5c8]">

            {filteredItems.map(
              (item) => (
                <div
                  key={item._id}
                  className="grid gap-4 px-6 py-5 md:grid-cols-[2fr_1fr_100px_110px_100px] md:items-center"
                >

                  {/* Dish */}
                  <div className="flex items-center gap-4">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    />

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <h3 className="truncate text-sm font-medium">
                          {item.name}
                        </h3>

                        {item.vegetarian && (
                          <Leaf
                            size={14}
                            className="shrink-0 text-[#647052]"
                          />
                        )}

                      </div>

                      <p className="mt-1 truncate text-xs text-[#756f64]">
                        {item.description}
                      </p>

                    </div>

                  </div>

                  {/* Category */}
                  <div className="text-xs text-[#756f64]">
                    {item.category}
                  </div>

                  {/* Price */}
                  <div className="text-sm font-medium">
                    ₹{item.price}
                  </div>

                  {/* Status */}
                  <div>
                    {item.featured ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0e7d8] px-3 py-1 text-xs text-[#8a6a4a]">

                        <Star
                          size={12}
                          fill="currentColor"
                        />

                        Featured

                      </span>
                    ) : (
                      <span className="text-xs text-[#756f64]">
                        Standard
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        onEdit(item)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ded5c8] transition hover:bg-[#f7f1e7]"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                      disabled={
                        deletingId ===
                        item._id
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ded5c8] text-red-700 transition hover:bg-red-50 disabled:opacity-40"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  )
}