import { useState } from "react"

import {
  ArrowUpRight,
  Check,
  Clock,
  Users,
} from "lucide-react"

import { createReservation } from "../api/api"
import Reveal from "./Reveal"

// =====================================================
// RESTAURANT TIME SLOTS
// =====================================================

const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
]

// =====================================================
// RESERVATION
// =====================================================

export default function Reservation() {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "2",
      time: "",
      message: "",
    })

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  const [error, setError] =
    useState("")

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    // Clear old messages when user edits form

    if (error) {
      setError("")
    }

    if (success) {
      setSuccess(false)
    }
  }

  // =====================================================
  // SELECT TIME
  // =====================================================

  const handleTimeSelect = (time) => {
    setFormData((previous) => ({
      ...previous,
      time,
    }))

    setError("")
    setSuccess(false)
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")
    setSuccess(false)

    // Time is required

    if (!formData.time) {
      setError(
        "Please choose a reservation time."
      )

      return
    }

    try {
      setLoading(true)

      await createReservation({
        ...formData,
        guests: Number(
          formData.guests
        ),
      })

      setSuccess(true)

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: "2",
        time: "",
        message: "",
      })
    } catch (err) {
      console.error(
        "Reservation error:",
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
  // MINIMUM DATE
  // =====================================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0]

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      id="reservation"
      className="px-5 py-24 sm:px-6 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <Reveal>

          <div className="max-w-2xl">

            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#8a6a4a] sm:text-xs">
              Reservations
            </p>

            <h2 className="mt-4 text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Save a seat
              <br />
              <span className="italic">
                for yourself.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-6 text-[#756f64] sm:text-base sm:leading-7">
              Whether it's dinner for two or a
              table full of friends, we'd love to
              have you.
            </p>

          </div>

        </Reveal>

        {/* =================================================
            RESERVATION CARD
        ================================================= */}

        <Reveal className="mt-10 sm:mt-12">

          <div className="overflow-hidden rounded-[1.5rem] border border-[#ded5c8] bg-[#fffdf8] sm:rounded-[2rem]">

            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

              {/* =================================================
                  LEFT INFO
              ================================================= */}

              <div className="bg-[#29251f] p-7 text-[#fffdf8] sm:p-8 md:p-12">

                <p className="text-sm text-[#c9b69f]">
                  Come hungry.
                </p>

                <h3 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
                  We'll take care
                  <br />
                  of the rest.
                </h3>

                <p className="mt-6 max-w-sm text-sm leading-6 text-[#8f887e]">
                  Reservations are held for
                  15 minutes. For larger groups,
                  please mention it in your
                  message and we'll get in touch.
                </p>

                {/* =================================================
                    OPENING HOURS
                ================================================= */}

                <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">

                  <div className="flex items-center gap-3">

                    <Clock
                      size={17}
                      className="text-[#c9b69f]"
                    />

                    <p className="text-sm">
                      Monday — Sunday
                    </p>

                  </div>

                  <div className="mt-3 space-y-1">

                    <p className="text-sm text-[#8f887e]">
                      Lunch&nbsp;&nbsp; 12:00 — 15:00
                    </p>

                    <p className="text-sm text-[#8f887e]">
                      Dinner&nbsp; 19:00 — 23:00
                    </p>

                  </div>

                </div>

                {/* =================================================
                    CAPACITY
                ================================================= */}

                <div className="mt-7 flex items-start gap-3">

                  <Users
                    size={17}
                    className="mt-0.5 shrink-0 text-[#c9b69f]"
                  />

                  <p className="text-sm leading-5 text-[#8f887e]">
                    Tables available for
                    1–20 guests
                  </p>

                </div>

              </div>

              {/* =================================================
                  RIGHT FORM
              ================================================= */}

              <div className="p-7 sm:p-8 md:p-12">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >

                  {/* =================================================
                      NAME
                  ================================================= */}

                  <div>

                    <label
                      htmlFor="name"
                      className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Your name"
                      required
                      autoComplete="name"
                      className="mt-3 w-full border-b border-[#ded5c8] bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#aaa39a] focus:border-[#29251f] sm:text-base"
                    />

                  </div>

                  {/* =================================================
                      EMAIL + PHONE
                  ================================================= */}

                  <div className="grid gap-7 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="email"
                        className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="mt-3 w-full border-b border-[#ded5c8] bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#aaa39a] focus:border-[#29251f] sm:text-base"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="phone"
                        className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                      >
                        Phone
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="+91 98765 43210"
                        required
                        autoComplete="tel"
                        className="mt-3 w-full border-b border-[#ded5c8] bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#aaa39a] focus:border-[#29251f] sm:text-base"
                      />

                    </div>

                  </div>

                  {/* =================================================
                      DATE + GUESTS
                  ================================================= */}

                  <div className="grid gap-7 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="date"
                        className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                      >
                        Date
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="date"
                        min={today}
                        value={
                          formData.date
                        }
                        onChange={
                          handleChange
                        }
                        required
                        className="mt-3 w-full border-b border-[#ded5c8] bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#29251f] sm:text-base"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="guests"
                        className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                      >
                        Guests
                      </label>

                      <select
                        id="guests"
                        name="guests"
                        value={
                          formData.guests
                        }
                        onChange={
                          handleChange
                        }
                        className="mt-3 w-full border-b border-[#ded5c8] bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#29251f] sm:text-base"
                      >

                        {Array.from(
                          {
                            length: 20,
                          },
                          (_, index) =>
                            index + 1
                        ).map(
                          (number) => (
                            <option
                              key={number}
                              value={number}
                            >
                              {number}{" "}
                              {number ===
                              1
                                ? "guest"
                                : "guests"}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                  </div>

                  {/* =================================================
                      TIME SELECTION
                  ================================================= */}

                  <div>

                    <div className="flex items-center justify-between gap-3">

                      <label className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs">
                        Choose a time
                      </label>

                      {formData.time && (
                        <span className="text-[10px] text-[#8a6a4a] sm:text-xs">
                          {formData.time}
                        </span>
                      )}

                    </div>

                    {/* =================================================
                        LUNCH
                    ================================================= */}

                    <div className="mt-4">

                      <p className="mb-3 text-xs text-[#aaa39a]">
                        Lunch
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">

                        {timeSlots
                          .filter(
                            (time) =>
                              time <
                              "15:00"
                          )
                          .map(
                            (time) => {

                              const selected =
                                formData.time ===
                                time

                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() =>
                                    handleTimeSelect(
                                      time
                                    )
                                  }
                                  aria-pressed={
                                    selected
                                  }
                                  className={`min-h-[44px] rounded-xl border px-2 py-2.5 text-xs transition duration-300 sm:px-3 sm:text-sm ${
                                    selected
                                      ? "border-[#29251f] bg-[#29251f] text-[#fffdf8]"
                                      : "border-[#ded5c8] bg-[#fffdf8] text-[#756f64] hover:border-[#8a6a4a] hover:text-[#29251f]"
                                  }`}
                                >
                                  {time}
                                </button>
                              )
                            }
                          )}

                      </div>

                    </div>

                    {/* =================================================
                        DINNER
                    ================================================= */}

                    <div className="mt-5">

                      <p className="mb-3 text-xs text-[#aaa39a]">
                        Dinner
                      </p>

                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">

                        {timeSlots
                          .filter(
                            (time) =>
                              time >=
                              "19:00"
                          )
                          .map(
                            (time) => {

                              const selected =
                                formData.time ===
                                time

                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() =>
                                    handleTimeSelect(
                                      time
                                    )
                                  }
                                  aria-pressed={
                                    selected
                                  }
                                  className={`min-h-[44px] rounded-xl border px-2 py-2.5 text-xs transition duration-300 sm:px-3 sm:text-sm ${
                                    selected
                                      ? "border-[#29251f] bg-[#29251f] text-[#fffdf8]"
                                      : "border-[#ded5c8] bg-[#fffdf8] text-[#756f64] hover:border-[#8a6a4a] hover:text-[#29251f]"
                                  }`}
                                >
                                  {time}
                                </button>
                              )
                            }
                          )}

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      MESSAGE
                  ================================================= */}

                  <div>

                    <label
                      htmlFor="message"
                      className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756f64] sm:text-xs"
                    >
                      Anything we should know?
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={
                        formData.message
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Birthday, dietary requirements, special occasion..."
                      rows={3}
                      className="mt-3 w-full resize-none rounded-2xl border border-[#ded5c8] bg-transparent p-4 text-sm leading-6 outline-none transition placeholder:text-[#aaa39a] focus:border-[#29251f]"
                    />

                  </div>

                  {/* =================================================
                      ERROR
                  ================================================= */}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-2xl bg-[#f7e9df] px-4 py-3 text-xs leading-5 text-[#8a4f3d] sm:text-sm"
                    >
                      {error}
                    </div>
                  )}

                  {/* =================================================
                      SUCCESS
                  ================================================= */}

                  {success && (
                    <div
                      role="status"
                      className="flex items-start gap-3 rounded-2xl bg-[#eef0e6] px-4 py-4 text-sm text-[#4d6045]"
                    >

                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4d6045] text-white">

                        <Check
                          size={14}
                        />

                      </div>

                      <div>

                        <p className="font-medium">
                          Reservation request
                          received.
                        </p>

                        <p className="mt-1 text-xs leading-5 opacity-80">
                          We'll confirm your table
                          shortly.
                        </p>

                      </div>

                    </div>
                  )}

                  {/* =================================================
                      SUBMIT
                  ================================================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#29251f] px-6 py-3.5 text-sm text-[#fffdf8] transition duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:py-4"
                  >

                    {loading ? (
                      <>
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />

                        Sending request...
                      </>
                    ) : (
                      <>
                        Request reservation

                        <ArrowUpRight
                          size={16}
                        />
                      </>
                    )}

                  </button>

                  <p className="text-center text-[10px] leading-5 text-[#aaa39a] sm:text-xs">
                    Your reservation is confirmed
                    only after approval from Sōma.
                  </p>

                </form>

              </div>

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  )
}