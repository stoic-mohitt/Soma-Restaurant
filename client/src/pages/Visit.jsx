import {
  ArrowUpRight,
  Clock,
  MapPin,
  Phone,
} from "lucide-react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Reveal from "../components/Reveal"

export default function Visit() {
  return (
    <div className="min-h-screen bg-[#f7f1e7] text-[#29251f]">

      <Navbar />

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36 md:px-10 md:pb-32 md:pt-44">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <div className="max-w-4xl">

                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
                  Visit Sōma
                </p>

                <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                  Come find
                  <br />
                  <span className="italic">
                    us.
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-sm leading-6 text-[#756f64] sm:mt-10 sm:text-base sm:leading-7">
                  A warm table, good food and a little
                  time away from everything else.
                </p>

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            LOCATION + HOURS
        ================================================= */}

        <section className="px-5 pb-20 sm:px-6 sm:pb-24 md:px-10 md:pb-32">

          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">

            {/* LOCATION */}

            <Reveal>

              <div className="h-full rounded-[1.5rem] border border-[#ded5c8] bg-[#fffdf8] p-7 sm:rounded-[2rem] sm:p-10 md:p-12">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f1e7]">

                  <MapPin
                    size={20}
                    className="text-[#8a6a4a]"
                  />

                </div>

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-[#8a6a4a]">
                  Find us
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                  24 Example Street
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#756f64]">
                  Mumbai, Maharashtra
                  <br />
                  India
                </p>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#29251f] transition hover:opacity-60"
                >
                  Get directions

                  <ArrowUpRight
                    size={15}
                  />
                </a>

              </div>

            </Reveal>

            {/* HOURS */}

            <Reveal>

              <div className="h-full rounded-[1.5rem] bg-[#29251f] p-7 text-[#fffdf8] sm:rounded-[2rem] sm:p-10 md:p-12">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">

                  <Clock
                    size={20}
                    className="text-[#c9b69f]"
                  />

                </div>

                <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-[#c9b69f]">
                  Opening hours
                </p>

                <div className="mt-7 space-y-5">

                  <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                    <p className="text-sm">
                      Monday — Sunday
                    </p>

                    <p className="text-sm text-[#b9b1a6]">
                      12:00 — 23:00
                    </p>

                  </div>

                  <div className="flex items-center justify-between gap-5">

                    <p className="text-sm">
                      Lunch
                    </p>

                    <p className="text-sm text-[#b9b1a6]">
                      12:00 — 15:00
                    </p>

                  </div>

                  <div className="flex items-center justify-between gap-5">

                    <p className="text-sm">
                      Dinner
                    </p>

                    <p className="text-sm text-[#b9b1a6]">
                      19:00 — 23:00
                    </p>

                  </div>

                </div>

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <section className="border-y border-[#ded5c8] bg-[#fffdf8] px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <div className="grid gap-10 md:grid-cols-2 md:items-end">

                <div>

                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
                    Get in touch
                  </p>

                  <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                    Have a question?
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-6 text-[#756f64]">
                    For larger groups, special occasions
                    or anything else, give us a call.
                  </p>

                </div>

                <div className="flex flex-col gap-5 md:items-end">

                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-3 text-base font-medium transition hover:opacity-60"
                  >

                    <Phone
                      size={17}
                      className="text-[#8a6a4a]"
                    />

                    +91 98765 43210

                  </a>

                  <a
                    href="/#reservation"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#29251f] px-5 py-3.5 text-sm text-[#fffdf8] transition hover:-translate-y-0.5 hover:opacity-90"
                  >
                    Make a reservation

                    <ArrowUpRight
                      size={15}
                    />
                  </a>

                </div>

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            MAP
        ================================================= */}

        <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">

          <Reveal>

            <div className="mx-auto max-w-7xl">

              <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-[#ded5c8] bg-[#eee6da] sm:min-h-[400px] sm:rounded-[2rem]">

                <div className="text-center">

                  <MapPin
                    size={28}
                    className="mx-auto text-[#8a6a4a]"
                  />

                  <p className="mt-4 text-sm font-medium">
                    Sōma, Mumbai
                  </p>

                  <p className="mt-2 text-xs text-[#756f64]">
                    Interactive map coming soon
                  </p>

                </div>

              </div>

            </div>

          </Reveal>

        </section>

      </main>

      <Footer />

    </div>
  )
}