import { useEffect, useMemo, useState } from "react"
import {
  CalendarDays,
  Clock,
  Users,
  Phone,
  Mail,
  Search,
  MessageSquare,
} from "lucide-react"

import {
  getReservations,
  updateReservationStatus,
} from "../../api/api"

const statuses = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
]

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    loadReservations()
  }, [])

  const loadReservations = async () => {
    try {
      setLoading(true)
      setError("")

      const result = await getReservations()

      setReservations(result.data || [])
    } catch (err) {
      console.error(err)

      setError(
        err.response?.data?.message ||
          "Failed to load reservations."
      )
    } finally {
      setLoading(false)
    }
  }

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const searchValue = search.toLowerCase()

      const matchesSearch =
        reservation.name
          ?.toLowerCase()
          .includes(searchValue) ||
        reservation.email
          ?.toLowerCase()
          .includes(searchValue) ||
        reservation.phone
          ?.toLowerCase()
          .includes(searchValue)

      const matchesStatus =
        statusFilter === "All" ||
        reservation.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [reservations, search, statusFilter])

  const handleStatusChange = async (
    reservationId,
    status
  ) => {
    try {
      const result =
        await updateReservationStatus(
          reservationId,
          status
        )

      setReservations((previous) =>
        previous.map((reservation) =>
          reservation._id === reservationId
            ? result.data
            : reservation
        )
      )
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update reservation."
      )
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700"

      case "Completed":
        return "bg-blue-100 text-blue-700"

      case "Cancelled":
        return "bg-red-100 text-red-700"

      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8a6a4a]">
          Reservations
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Reservations
            </h1>

            <p className="mt-2 text-sm text-[#756f64]">
              Manage customer table requests and
              reservation status.
            </p>
          </div>

          <button
            onClick={loadReservations}
            className="rounded-full border border-[#ded5c8] bg-[#fffdf8] px-5 py-2.5 text-sm transition hover:bg-[#f7f1e7]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-2xl border border-[#ded5c8] bg-[#fffdf8] p-4">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756f64]"
            />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-[#ded5c8] bg-[#f7f1e7] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#8a6a4a]"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() =>
                  setStatusFilter(status)
                }
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  statusFilter === status
                    ? "bg-[#29251f] text-[#fffdf8]"
                    : "border border-[#ded5c8] bg-[#f7f1e7] text-[#756f64] hover:bg-[#eee6da]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf8] p-12 text-center">
          <p className="text-sm text-[#756f64]">
            Loading reservations...
          </p>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="rounded-2xl border border-[#ded5c8] bg-[#fffdf8] p-12 text-center">
          <CalendarDays
            size={32}
            strokeWidth={1.5}
            className="mx-auto text-[#8a6a4a]"
          />

          <h3 className="mt-4 text-lg font-medium">
            No reservations found
          </h3>

          <p className="mt-2 text-sm text-[#756f64]">
            {reservations.length === 0
              ? "Customer reservation requests will appear here."
              : "Try changing your search or status filter."}
          </p>
        </div>
      ) : (

        /* Reservation cards */
        <div className="space-y-4">

          {filteredReservations.map(
            (reservation) => (
              <div
                key={reservation._id}
                className="rounded-2xl border border-[#ded5c8] bg-[#fffdf8] p-6"
              >

                {/* Top row */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                  <div>
                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-xl font-medium">
                        {reservation.name}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                          reservation.status
                        )}`}
                      >
                        {reservation.status}
                      </span>

                    </div>

                    <p className="mt-1 text-sm text-[#756f64]">
                      Reservation #{reservation._id.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* Status selector */}
                  <select
                    value={reservation.status}
                    onChange={(e) =>
                      handleStatusChange(
                        reservation._id,
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-[#ded5c8] bg-[#f7f1e7] px-4 py-2.5 text-sm outline-none focus:border-[#8a6a4a]"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>

                </div>

                {/* Reservation details */}
                <div className="mt-6 grid gap-4 border-t border-[#ded5c8] pt-6 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="flex gap-3">
                    <CalendarDays
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 text-[#8a6a4a]"
                    />

                    <div>
                      <p className="text-xs text-[#756f64]">
                        Date
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {formatDate(
                          reservation.date
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 text-[#8a6a4a]"
                    />

                    <div>
                      <p className="text-xs text-[#756f64]">
                        Time
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {reservation.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Users
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 text-[#8a6a4a]"
                    />

                    <div>
                      <p className="text-xs text-[#756f64]">
                        Guests
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {reservation.guests}{" "}
                        {reservation.guests === 1
                          ? "guest"
                          : "guests"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 text-[#8a6a4a]"
                    />

                    <div>
                      <p className="text-xs text-[#756f64]">
                        Phone
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {reservation.phone}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Contact */}
                <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#756f64]">

                  <div className="flex items-center gap-2">
                    <Mail size={15} />
                    {reservation.email}
                  </div>

                </div>

                {/* Message */}
                {reservation.message && (
                  <div className="mt-5 flex gap-3 rounded-xl bg-[#f7f1e7] p-4">
                    <MessageSquare
                      size={17}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-[#8a6a4a]"
                    />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#756f64]">
                        Special request
                      </p>

                      <p className="mt-1 text-sm leading-6">
                        {reservation.message}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            )
          )}

        </div>
      )}

    </div>
  )
}