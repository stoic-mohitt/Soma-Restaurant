import {
  ArrowUpRight,
  Leaf,
  Heart,
  Sparkles,
} from "lucide-react"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Reveal from "../components/Reveal"

export default function Story() {
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
                  Our Story
                </p>

                <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                  Rooted in
                  <br />
                  tradition.
                  <br />
                  <span className="italic">
                    Made for today.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-sm leading-6 text-[#756f64] sm:mt-10 sm:text-base sm:leading-7">
                  Sōma is our take on contemporary
                  Indian food — familiar enough to feel
                  like home, but curious enough to keep
                  things interesting.
                </p>

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            STORY
        ================================================= */}

        <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">

          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center md:gap-20">

            {/* IMAGE */}

            <Reveal>

              <div className="image-hover aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#ded5c8] sm:rounded-[2rem]">

                <img
                  src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85"
                  alt="Indian food served at a table"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />

              </div>

            </Reveal>

            {/* TEXT */}

            <Reveal>

              <div>

                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
                  Where we started
                </p>

                <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Food should feel
                  <br />
                  familiar.
                </h2>

                <div className="mt-7 space-y-5 text-sm leading-7 text-[#756f64] sm:mt-8 sm:text-base">

                  <p>
                    Indian food has always been about
                    more than what's on the plate. It's
                    about people, stories, memories and
                    the feeling of being welcomed to a
                    table.
                  </p>

                  <p>
                    Sōma started with a simple idea:
                    take those familiar flavours and
                    ingredients and give them room to
                    evolve.
                  </p>

                  <p>
                    We cook with respect for tradition,
                    but we don't believe tradition has to
                    stand still.
                  </p>

                </div>

              </div>

            </Reveal>

          </div>

        </section>

        {/* =================================================
            VALUES
        ================================================= */}

        <section className="border-y border-[#ded5c8] bg-[#fffdf8] px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">

          <div className="mx-auto max-w-7xl">

            <Reveal>

              <div className="max-w-2xl">

                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
                  What matters to us
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                  Simple things,
                  <br />
                  done thoughtfully.
                </h2>

              </div>

            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-[#ded5c8] bg-[#ded5c8] sm:mt-14 md:grid-cols-3 md:rounded-[2rem]">

              {/* VALUE 1 */}

              <Reveal>

                <div className="h-full bg-[#fffdf8] p-7 sm:p-8 md:p-10">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f1e7]">

                    <Leaf
                      size={20}
                      className="text-[#8a6a4a]"
                    />

                  </div>

                  <h3 className="mt-7 text-xl font-medium">
                    Good ingredients
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#756f64]">
                    Seasonal produce, familiar spices
                    and ingredients we genuinely want
                    to cook with.
                  </p>

                </div>

              </Reveal>

              {/* VALUE 2 */}

              <Reveal>

                <div className="h-full bg-[#fffdf8] p-7 sm:p-8 md:p-10">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f1e7]">

                    <Heart
                      size={20}
                      className="text-[#8a6a4a]"
                    />

                  </div>

                  <h3 className="mt-7 text-xl font-medium">
                    Honest cooking
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#756f64]">
                    No unnecessary complexity. Just
                    thoughtful cooking that lets the
                    ingredients speak.
                  </p>

                </div>

              </Reveal>

              {/* VALUE 3 */}

              <Reveal>

                <div className="h-full bg-[#fffdf8] p-7 sm:p-8 md:p-10">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f1e7]">

                    <Sparkles
                      size={20}
                      className="text-[#8a6a4a]"
                    />

                  </div>

                  <h3 className="mt-7 text-xl font-medium">
                    A little curiosity
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#756f64]">
                    We love the classics. We also love
                    asking what happens when we look at
                    them a little differently.
                  </p>

                </div>

              </Reveal>

            </div>

          </div>

        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">

          <Reveal>

            <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] bg-[#29251f] p-8 text-[#fffdf8] sm:rounded-[2rem] sm:p-12 md:p-16">

              <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

                <div>

                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#c9b69f]">
                    Come hungry
                  </p>

                  <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                    There's a seat
                    <br />
                    waiting for you.
                  </h2>

                </div>

                <a
                  href="/#reservation"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fffdf8] px-5 py-3.5 text-sm font-medium text-[#29251f] transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  Reserve a table

                  <ArrowUpRight
                    size={16}
                  />
                </a>

              </div>

            </div>

          </Reveal>

        </section>

      </main>

      <Footer />

    </div>
  )
}