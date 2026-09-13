import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-visible px-5 pb-24 pt-28 sm:px-6 md:px-10 md:pb-32 md:pt-40"
    >
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="max-w-xl">

          {/* Eyebrow */}

          <p className="animate-fade-up mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs sm:tracking-[0.3em]">
            Contemporary Indian Kitchen
          </p>

          {/* Heading */}

          <h1
            className="animate-fade-up text-[3.5rem] font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl md:text-8xl"
            style={{
              animationDelay: "100ms",
            }}
          >
            Food that
            <br />
            feels like
            <br />
            <span className="italic">
              home.
            </span>
          </h1>

          {/* Description */}

          <p
            className="animate-fade-up mt-7 max-w-md text-sm leading-6 text-[#756f64] sm:mt-8 sm:text-base sm:leading-7"
            style={{
              animationDelay: "200ms",
            }}
          >
            Thoughtfully made food rooted in
            familiar ingredients, seasonal
            produce and a little curiosity.
          </p>

          {/* Buttons */}

          <div
            className="animate-fade-up mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            style={{
              animationDelay: "300ms",
            }}
          >

            <a
              href="#menu"
              className="flex items-center justify-center gap-2 rounded-full bg-[#29251f] px-6 py-3.5 text-sm text-[#fffdf8] transition hover:-translate-y-0.5 hover:opacity-85 sm:w-auto"
            >
              Explore Menu

              <ArrowUpRight
                size={16}
              />
            </a>

            <a
              href="#ai"
              className="flex items-center justify-center rounded-full border border-[#29251f]/20 px-6 py-3.5 text-sm transition hover:-translate-y-0.5 hover:bg-[#29251f] hover:text-[#fffdf8] sm:w-auto"
            >
              Ask Sōma AI
            </a>

          </div>

        </div>

        {/* =================================================
            RIGHT IMAGE
        ================================================= */}

        <div
          className="animate-fade-in relative mt-2 md:mt-0"
          style={{
            animationDelay: "200ms",
          }}
        >

          {/* Image */}

          <div className="image-hover aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#ded5c8] sm:rounded-[2rem]">

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85"
              alt="Gourmet burger"
              className="h-full w-full object-cover"
            />

          </div>

          {/* =================================================
              OPENING HOURS
          ================================================= */}

          <div className="absolute -bottom-7 left-4 z-20 rounded-t-[1.5rem] border border-b-0 border-[#ded5c8] bg-[#fffdf8] px-5 py-5 shadow-sm transition-transform duration-500 hover:-translate-y-1 sm:left-6 sm:px-7 sm:py-6 md:left-10">

            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a6a4a] sm:text-xs sm:tracking-[0.25em]">
              Open today
            </p>

            <p className="mt-2 text-base tracking-tight text-[#29251f] sm:text-lg">
              12:00 — 23:00
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================= */}

      <div className="absolute bottom-8 left-10 hidden items-center gap-2 text-xs text-[#756f64] md:flex">

        <ArrowDown
          size={14}
          className="animate-bounce"
        />

        Scroll to explore

      </div>

    </section>
  )
}