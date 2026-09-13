import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Leaf,
  Flame,
  ArrowUpRight,
} from "lucide-react"

import { getMenu } from "../api/api"
import Reveal from "./Reveal"

const categories = [
  "All",
  "Small Plates",
  "Mains",
  "Breads",
  "Desserts",
]

// =====================================================
// MENU SKELETON
// =====================================================

function MenuSkeleton() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">

      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          key={index}
          className={`overflow-hidden rounded-3xl border border-[#ded5c8] bg-[#fffdf8] ${
            index % 3 === 1
              ? "lg:translate-y-8"
              : ""
          }`}
        >
          {/* Image */}

          <div className="relative aspect-[4/3] overflow-hidden bg-[#eee6da]">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Content */}

          <div className="p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <div className="flex-1">

                <div className="h-5 w-3/4 animate-pulse rounded-full bg-[#e5ddd1]" />

                <div className="mt-3 h-3 w-1/3 animate-pulse rounded-full bg-[#eee6da]" />

              </div>

              <div className="h-4 w-12 animate-pulse rounded-full bg-[#e5ddd1]" />

            </div>

            <div className="mt-6 h-3 w-full animate-pulse rounded-full bg-[#eee6da]" />

            <div className="mt-2 h-3 w-5/6 animate-pulse rounded-full bg-[#eee6da]" />

          </div>
        </div>
      ))}
    </div>
  )
}

// =====================================================
// MENU
// =====================================================

export default function Menu() {
  const [menuItems, setMenuItems] =
    useState([])

  const [activeCategory, setActiveCategory] =
    useState("All")

  const [activeItem, setActiveItem] =
    useState(null)

  const [aiSelectedItem, setAISelectedItem] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  // =====================================================
  // LOAD MENU
  // =====================================================

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const result = await getMenu()

        setMenuItems(
          result.data || []
        )
      } catch (error) {
        console.error(
          "Failed to load menu:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  // =====================================================
  // AI → MENU
  // =====================================================

  useEffect(() => {
    const handleAISelection = (event) => {
      const dishName =
        event.detail?.dish

      if (!dishName) return

      const item = menuItems.find(
        (menuItem) =>
          menuItem.name === dishName
      )

      if (!item) {
        console.warn(
          `Menu item "${dishName}" not found.`
        )

        return
      }

      setActiveCategory("All")
      setActiveItem(item)
      setAISelectedItem(item._id)

      // Remove AI highlight after 3 seconds

      setTimeout(() => {
        setAISelectedItem(null)
      }, 3000)

      // Scroll to exact menu item

      setTimeout(() => {
        const element =
          document.getElementById(
            `menu-item-${item._id}`
          )

        if (!element) return

        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }

    window.addEventListener(
      "soma-ai-select",
      handleAISelection
    )

    return () => {
      window.removeEventListener(
        "soma-ai-select",
        handleAISelection
      )
    }
  }, [menuItems])

  // =====================================================
  // FILTER
  // =====================================================

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return menuItems
    }

    return menuItems.filter(
      (item) =>
        item.category ===
        activeCategory
    )
  }, [
    menuItems,
    activeCategory,
  ])

  // =====================================================
  // SPICE LABEL
  // =====================================================

  const getSpiceLabel = (level) => {
    if (!level) return "No spice"

    if (level === 1) return "Mild"

    if (level === 2) return "Medium"

    if (level === 3) return "Spicy"

    return "Very spicy"
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <section
      id="menu"
      className="px-5 py-24 sm:px-6 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <Reveal>
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end md:gap-8">

            <div>

              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
                The Menu
              </p>

              <h2 className="mt-4 text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-5xl md:text-6xl">
                Made to be
                <br />
                remembered.
              </h2>

            </div>

            <p className="max-w-sm text-sm leading-6 text-[#756f64]">
              Familiar Indian flavours, seasonal
              ingredients and a little curiosity on
              every plate.
            </p>

          </div>
        </Reveal>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <MenuSkeleton />
        ) : (
          <>
            {/* =============================================
                CATEGORY FILTER
            ============================================= */}

            <Reveal className="mt-10 lg:mt-12">

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">

                {categories.map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(
                          category
                        )

                        setActiveItem(null)
                        setAISelectedItem(
                          null
                        )
                      }}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-xs transition sm:px-5 sm:text-sm ${
                        activeCategory ===
                        category
                          ? "bg-[#29251f] text-[#fffdf8]"
                          : "border border-[#ded5c8] bg-[#fffdf8] text-[#756f64] hover:bg-[#eee6da]"
                      }`}
                    >
                      {category}
                    </button>
                  )
                )}

              </div>

            </Reveal>

            {/* =============================================
                MENU GRID
            ============================================= */}

            <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">

              {filteredItems.map(
                (item, index) => {

                  const isActive =
                    activeItem?._id ===
                    item._id

                  const isAISelected =
                    aiSelectedItem ===
                    item._id

                  return (
                    <Reveal
                      key={item._id}
                      className={
                        index % 3 === 1
                          ? "lg:translate-y-8"
                          : ""
                      }
                    >

                      <article
                        id={`menu-item-${item._id}`}
                        className={`menu-card group relative overflow-hidden rounded-[1.5rem] border bg-[#fffdf8] transition-all duration-500 sm:rounded-3xl ${
                          isAISelected
                            ? "border-[#8a6a4a] shadow-[0_20px_60px_rgba(138,106,74,0.28)] ring-2 ring-[#8a6a4a]/20"
                            : isActive
                            ? "border-[#8a6a4a] shadow-[0_20px_50px_rgba(138,106,74,0.15)]"
                            : "border-[#ded5c8]"
                        }`}
                        onMouseEnter={() =>
                          setActiveItem(
                            item
                          )
                        }
                        onMouseLeave={() =>
                          setActiveItem(
                            null
                          )
                        }
                        onClick={() =>
                          setActiveItem(
                            isActive
                              ? null
                              : item
                          )
                        }
                      >

                        {/* =================================
                            IMAGE
                        ================================= */}

                        <div className="image-hover relative aspect-[4/3] overflow-hidden">

                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className={`h-full w-full object-cover transition-transform duration-700 ${
                              isAISelected
                                ? "scale-105"
                                : ""
                            }`}
                          />

                          {/* Featured */}

                          {item.featured && (
                            <span className="absolute left-3 top-3 rounded-full bg-[#fffdf8]/90 px-3 py-1.5 text-[10px] font-medium backdrop-blur-sm sm:left-4 sm:top-4 sm:text-xs">
                              Sōma favourite
                            </span>
                          )}

                          {/* Vegetarian */}

                          {item.vegetarian && (
                            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#fffdf8]/90 backdrop-blur-sm sm:right-4 sm:top-4">

                              <Leaf
                                size={15}
                                className="text-green-700"
                              />

                            </span>
                          )}

                          {/* AI */}

                          {isAISelected && (
                            <span className="absolute bottom-3 left-3 rounded-full bg-[#29251f]/90 px-3 py-1.5 text-[10px] font-medium text-[#fffdf8] backdrop-blur-sm sm:bottom-4 sm:left-4 sm:text-xs">
                              Recommended for you
                            </span>
                          )}

                        </div>

                        {/* =================================
                            CARD CONTENT
                        ================================= */}

                        <div className="p-5 sm:p-6">

                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <h3 className="text-lg font-medium leading-snug sm:text-xl">
                                {item.name}
                              </h3>

                              <p className="mt-2 text-xs text-[#756f64] sm:text-sm">
                                {item.category}
                              </p>

                            </div>

                            <span className="shrink-0 text-sm font-medium">
                              ₹{item.price}
                            </span>

                          </div>

                          {/* =================================
                              DETAILS
                          ================================= */}

                          <div
                            className={`grid transition-all duration-500 ${
                              isActive ||
                              isAISelected
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >

                            <div className="overflow-hidden">

                              <div className="mt-5 border-t border-[#ded5c8] pt-5 sm:mt-6">

                                <p className="text-sm leading-6 text-[#756f64]">
                                  {
                                    item.description
                                  }
                                </p>

                                {/* Tags */}

                                <div className="mt-5 flex flex-wrap items-center gap-2">

                                  {item.vegetarian && (
                                    <span className="flex items-center gap-1.5 rounded-full bg-[#f0eee5] px-3 py-1.5 text-xs">

                                      <Leaf
                                        size={13}
                                      />

                                      Vegetarian

                                    </span>
                                  )}

                                  {item.spiceLevel >
                                    0 && (
                                    <span className="flex items-center gap-1.5 rounded-full bg-[#f7e9df] px-3 py-1.5 text-xs">

                                      <Flame
                                        size={13}
                                      />

                                      {getSpiceLabel(
                                        item.spiceLevel
                                      )}

                                    </span>
                                  )}

                                  {item.tags?.map(
                                    (tag) => (
                                      <span
                                        key={
                                          tag
                                        }
                                        className="rounded-full bg-[#f7f1e7] px-3 py-1.5 text-xs text-[#756f64]"
                                      >
                                        {tag}
                                      </span>
                                    )
                                  )}

                                </div>

                                {/* Footer */}

                                <div className="mt-5 flex items-center justify-between">

                                  <span className="text-[10px] uppercase tracking-[0.15em] text-[#8a6a4a] sm:text-xs">
                                    View details
                                  </span>

                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#29251f] text-[#fffdf8]">

                                    <ArrowUpRight
                                      size={14}
                                    />

                                  </span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </article>

                    </Reveal>
                  )
                }
              )}

            </div>

            {/* =============================================
                EMPTY STATE
            ============================================= */}

            {filteredItems.length ===
              0 && (
              <div className="py-20 text-center">

                <p className="text-sm text-[#756f64]">
                  No dishes found in this
                  category.
                </p>

              </div>
            )}
          </>
        )}

      </div>
    </section>
  )
}