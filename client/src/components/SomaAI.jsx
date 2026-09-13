import { useState } from "react"

import {
  Sparkles,
  ArrowUpRight,
  LoaderCircle,
  RotateCcw,
} from "lucide-react"

import { getAIRecommendations } from "../api/api"

export default function SomaAI() {
  const [craving, setCraving] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // =====================================================
  // SUBMIT CRAVING
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!craving.trim()) {
      return
    }

    try {
      setLoading(true)
      setError("")
      setResult(null)

      const response =
        await getAIRecommendations(craving)

      setResult(response.data)
    } catch (err) {
      console.error(
        "Sōma AI error:",
        err
      )

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // VIEW DISH
  // =====================================================

  const handleViewDish = (dishName) => {
    window.dispatchEvent(
      new CustomEvent("soma-ai-select", {
        detail: {
          dish: dishName,
        },
      })
    )

    setTimeout(() => {
      const menu =
        document.getElementById("menu")

      if (!menu) return

      menu.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 150)
  }

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setResult(null)
    setError("")
  }

  return (
    <section
      id="ai"
      className="px-5 py-24 sm:px-6 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-2xl">

          <div className="flex items-center gap-2 text-[#8a6a4a]">

            <Sparkles
              size={17}
              className="animate-pulse"
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.25em] sm:text-xs">
              Sōma AI
            </p>

          </div>

          <h2 className="mt-5 text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-5xl md:text-6xl">
            Not sure what
            <br />
            you're craving?
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-6 text-[#756f64] sm:text-base sm:leading-7">
            Tell us what sounds good and
            Sōma AI will find something from
            our menu for you.
          </p>

        </div>

        {/* =================================================
            AI PANEL
        ================================================= */}

        <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-[#29251f] text-[#fffdf8] sm:mt-12 sm:rounded-[2rem]">

          <div className="grid md:grid-cols-2">

            {/* =================================================
                LEFT — INPUT
            ================================================= */}

            <div className="p-6 sm:p-8 md:p-12">

              <p className="text-sm text-[#c9b69f]">
                What are you in the mood for?
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-5 sm:mt-6"
              >

                <textarea
                  value={craving}
                  onChange={(e) =>
                    setCraving(
                      e.target.value
                    )
                  }
                  placeholder="Something creamy, spicy and comforting..."
                  rows={5}
                  className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-[#fffdf8] outline-none transition duration-300 placeholder:text-[#8f887e] focus:border-[#c9b69f] focus:bg-white/[0.07] sm:min-h-0 sm:p-5 sm:text-base"
                />

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !craving.trim()
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#fffdf8] px-6 py-3.5 text-sm font-medium text-[#29251f] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 sm:mt-4 sm:py-4"
                >

                  {loading ? (
                    <>
                      <LoaderCircle
                        size={16}
                        className="animate-spin"
                      />

                      Finding your dishes...
                    </>
                  ) : (
                    <>
                      Find my dishes

                      <ArrowUpRight
                        size={16}
                      />
                    </>
                  )}

                </button>

              </form>

              {/* =================================================
                  SUGGESTIONS
              ================================================= */}

              <div className="mt-6">

                <p className="text-xs text-[#8f887e]">
                  Try:
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  {[
                    "Something creamy",
                    "Vegetarian & spicy",
                    "Comfort food",
                    "Something rich",
                  ].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          setCraving(
                            suggestion
                          )
                        }
                        className="rounded-full border border-white/10 px-3 py-2 text-[11px] text-[#b9b1a6] transition duration-300 hover:border-[#c9b69f] hover:bg-white/5 hover:text-[#fffdf8] sm:text-xs"
                      >
                        {suggestion}
                      </button>
                    )
                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT — RESULTS
            ================================================= */}

            <div className="min-h-[420px] border-t border-white/10 bg-white/5 p-6 sm:p-8 md:min-h-[500px] md:border-l md:border-t-0 md:p-12">

              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {!result &&
                !loading &&
                !error && (
                  <div className="flex min-h-[380px] flex-col justify-center animate-fade-up md:min-h-[400px]">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9b69f]/30 bg-[#c9b69f]/10">

                      <Sparkles
                        size={21}
                        strokeWidth={1.5}
                        className="text-[#c9b69f]"
                      />

                    </div>

                    <h3 className="mt-6 text-2xl font-medium leading-tight">
                      Your next favourite dish
                      might be here.
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-[#8f887e]">
                      Tell Sōma what you're looking
                      for and we'll make a few
                      suggestions.
                    </p>

                  </div>
                )}

              {/* =================================================
                  LOADING
              ================================================= */}

              {loading && (
                <div className="flex min-h-[380px] items-center justify-center md:min-h-[400px]">

                  <div className="w-full max-w-sm">

                    <div className="text-center">

                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#c9b69f]/30 bg-[#c9b69f]/10">

                        <LoaderCircle
                          size={22}
                          className="animate-spin text-[#c9b69f]"
                        />

                      </div>

                      <p className="mt-5 text-sm text-[#b9b1a6]">
                        Looking through the menu...
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#716b63]">
                        Finding something that
                        matches your craving.
                      </p>

                    </div>

                    {/* Skeleton cards */}

                    <div className="mt-8 space-y-3">

                      {[1, 2].map(
                        (number) => (
                          <div
                            key={number}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5"
                          >

                            <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/10" />

                            <div className="mt-4 h-3 w-full animate-pulse rounded-full bg-white/5" />

                            <div className="mt-2 h-3 w-4/5 animate-pulse rounded-full bg-white/5" />

                          </div>
                        )
                      )}

                    </div>

                  </div>

                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="flex min-h-[380px] items-center md:min-h-[400px]">

                  <div className="animate-fade-up">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-300/10">

                      <span className="text-lg text-red-300">
                        !
                      </span>

                    </div>

                    <p className="mt-5 max-w-sm text-sm leading-6 text-red-300">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#c9b69f] transition duration-300 hover:text-[#fffdf8]"
                    >
                      <RotateCcw
                        size={13}
                      />

                      Try again
                    </button>

                  </div>

                </div>
              )}

              {/* =================================================
                  RESULTS
              ================================================= */}

              {result &&
                !loading && (
                  <div className="animate-fade-up">

                    {/* Introduction */}

                    <div className="flex items-start justify-between gap-4">

                      <p className="max-w-md text-sm leading-6 text-[#b9b1a6]">
                        {result.introduction}
                      </p>

                      <Sparkles
                        size={18}
                        className="hidden shrink-0 text-[#c9b69f] sm:block"
                      />

                    </div>

                    {/* Recommendation cards */}

                    <div className="mt-7 space-y-3 sm:mt-8 sm:space-y-4">

                      {result.recommendations.map(
                        (item, index) => (
                          <div
                            key={item.dish}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-4 opacity-0 animate-ai-result transition duration-300 hover:border-white/20 hover:bg-white/[0.08] sm:p-5"
                            style={{
                              animationDelay: `${
                                index * 120
                              }ms`,
                            }}
                          >

                            <div className="flex items-start justify-between gap-3">

                              <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">

                                <span className="mt-1 shrink-0 text-[9px] uppercase tracking-[0.2em] text-[#716b63] sm:text-[10px]">
                                  {String(
                                    index + 1
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>

                                <h3 className="text-base font-medium leading-5 sm:text-lg">
                                  {item.dish}
                                </h3>

                              </div>

                              <span className="shrink-0 text-sm text-[#c9b69f]">
                                ₹{item.price}
                              </span>

                            </div>

                            <p className="mt-3 text-xs leading-5 text-[#8f887e] sm:text-sm sm:leading-6">
                              {item.reason}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                handleViewDish(
                                  item.dish
                                )
                              }
                              className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#c9b69f] transition duration-300 hover:text-[#fffdf8] sm:mt-5 sm:text-xs"
                            >
                              View dish

                              <ArrowUpRight
                                size={13}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              />
                            </button>

                          </div>
                        )
                      )}

                    </div>

                    {/* Ask again */}

                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-5 flex items-center gap-2 text-[11px] text-[#716b63] transition duration-300 hover:text-[#fffdf8] sm:mt-6 sm:text-xs"
                    >
                      <RotateCcw
                        size={13}
                      />

                      Ask Sōma something else
                    </button>

                  </div>
                )}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}