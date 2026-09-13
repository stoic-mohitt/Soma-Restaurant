import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // =====================================================
  // SCROLL DETECTION
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    handleScroll()

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    )

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      )
    }
  }, [])

  // =====================================================
  // CLOSE MOBILE MENU
  // =====================================================

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-500 md:px-10 ${
        scrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 ${
          scrolled
            ? "border-[#ded5c8] bg-[#fffdf8]/95 shadow-[0_10px_35px_rgba(41,37,31,0.08)] backdrop-blur-xl"
            : "border-[#ded5c8]/70 bg-[#fffdf8]/80 backdrop-blur-md"
        }`}
      >
        {/* =================================================
            MAIN NAVBAR
        ================================================= */}

        <div
          className={`flex items-center justify-between px-5 transition-all duration-500 ${
            scrolled
              ? "py-2.5"
              : "py-3"
          }`}
        >
          {/* LOGO */}

          <a
            href="/"
            onClick={closeMobileMenu}
            className="text-xl font-semibold tracking-[0.2em]"
          >
            SŌMA
          </a>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden items-center gap-8 text-sm md:flex">
            <a
              href="/#menu"
              className="transition hover:opacity-60"
            >
              Menu
            </a>

            <a
              href="/story"
              className="transition hover:opacity-60"
            >
              Our Story
            </a>

            <a
              href="/visit"
              className="transition hover:opacity-60"
            >
              Visit
            </a>
          </div>

          {/* DESKTOP RESERVE BUTTON */}

          <a
            href="/#reservation"
            className="hidden items-center gap-2 rounded-full bg-[#29251f] px-4 py-2 text-sm text-[#fffdf8] transition hover:-translate-y-0.5 hover:opacity-85 md:flex"
          >
            Reserve

            <ArrowUpRight size={15} />
          </a>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            onClick={() =>
              setMobileOpen(
                !mobileOpen
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5c8] bg-[#fffdf8] md:hidden"
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        <div
          className={`grid transition-all duration-500 md:hidden ${
            mobileOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#ded5c8] px-5 pb-5 pt-4">

              <div className="flex flex-col gap-1">

                <a
                  href="/#menu"
                  onClick={closeMobileMenu}
                  className="rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f7f1e7]"
                >
                  Menu
                </a>

                <a
                  href="/story"
                  onClick={closeMobileMenu}
                  className="rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f7f1e7]"
                >
                  Our Story
                </a>

                <a
                  href="/visit"
                  onClick={closeMobileMenu}
                  className="rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f7f1e7]"
                >
                  Visit
                </a>

                <a
                  href="/#reservation"
                  onClick={closeMobileMenu}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#29251f] px-5 py-3 text-sm text-[#fffdf8] transition hover:opacity-85"
                >
                  Reserve

                  <ArrowUpRight
                    size={15}
                  />
                </a>

              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}