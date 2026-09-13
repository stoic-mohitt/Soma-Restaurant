import {
  ArrowUpRight,
  Camera,
  MapPin,
  Phone,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-[#ded5c8] bg-[#29251f] text-[#fffdf8]">

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}

          <div className="lg:col-span-2">

            <a
              href="/"
              className="text-3xl font-semibold tracking-[0.2em]"
            >
              SŌMA
            </a>

            <p className="mt-5 max-w-md text-sm leading-6 text-[#8f887e]">
              Contemporary Indian food rooted in
              familiar ingredients, seasonal produce
              and a little curiosity.
            </p>

            <a
              href="/#reservation"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fffdf8] px-5 py-3 text-sm font-medium text-[#29251f] transition hover:-translate-y-0.5 hover:opacity-90"
            >
              Reserve a table

              <ArrowUpRight
                size={15}
              />
            </a>

          </div>

          {/* EXPLORE */}

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9b69f]">
              Explore
            </p>

            <div className="mt-5 flex flex-col items-start gap-3">

              <a
                href="/#menu"
                className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >
                Menu
              </a>

              <a
                href="/story"
                className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >
                Our Story
              </a>

              <a
                href="/visit"
                className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >
                Visit
              </a>

              <a
                href="/#ai"
                className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >
                Sōma AI
              </a>

              <a
                href="/#reservation"
                className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >
                Reservations
              </a>

            </div>

          </div>

          {/* FIND US */}

          <div>

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9b69f]">
              Find us
            </p>

            <div className="mt-5 space-y-5">

              {/* ADDRESS */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[#c9b69f]"
                />

                <p className="text-sm leading-6 text-[#b9b1a6]">
                  24 Example Street
                  <br />
                  Mumbai, Maharashtra
                </p>

              </div>

              {/* PHONE */}

              <div className="flex items-center gap-3">

                <Phone
                  size={16}
                  className="shrink-0 text-[#c9b69f]"
                />

                <a
                  href="tel:+919876543210"
                  className="text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
                >
                  +91 98765 43210
                </a>

              </div>

              {/* SOCIAL */}

              <a
                href="#"
                className="flex items-center gap-3 text-sm text-[#b9b1a6] transition hover:text-[#fffdf8]"
              >

                <Camera
                  size={16}
                  className="text-[#c9b69f]"
                />

                Instagram

                <ArrowUpRight
                  size={13}
                />

              </a>

            </div>

          </div>

        </div>

        {/* DIVIDER */}

        <div className="my-12 border-t border-white/10" />

        {/* COPYRIGHT */}

        <div className="flex flex-col gap-4 text-xs text-[#716b63] md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Sōma.
            All rights reserved.
          </p>

          <p>
            Contemporary Indian Kitchen
          </p>

        </div>

      </div>

    </footer>
  )
}