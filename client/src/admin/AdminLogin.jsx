import { useState } from "react"
import { ArrowUpRight, LockKeyhole } from "lucide-react"

import { loginAdmin } from "../api/api"

export default function AdminLogin({
  onLogin,
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      )
      return
    }

    try {
      setLoading(true)

      const result = await loginAdmin(
        email,
        password
      )

      localStorage.setItem(
        "soma_admin_token",
        result.token
      )

      localStorage.setItem(
        "soma_admin",
        JSON.stringify(result.admin)
      )

      onLogin(result.admin)
    } catch (error) {
      console.error(
        "Login failed:",
        error
      )

      setError(
        error?.response?.data?.message ||
          "Unable to log in. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f1e7] px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">

          <h1 className="text-3xl font-semibold tracking-[0.2em]">
            SŌMA
          </h1>

          <p className="mt-2 text-sm text-[#756f64]">
            Restaurant Administration
          </p>

        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-[#ded5c8] bg-[#fffdf8] p-8 shadow-sm">

          <div className="mb-8">

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f1e7]">
              <LockKeyhole
                size={19}
                strokeWidth={1.7}
              />
            </div>

            <h2 className="text-2xl font-medium">
              Welcome back.
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756f64]">
              Sign in to manage the Sōma restaurant
              dashboard.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@soma.com"
                autoComplete="email"
                className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#ded5c8] bg-[#fffdf8] px-4 py-3 text-sm outline-none transition placeholder:text-[#756f64]/60 focus:border-[#8a6a4a]"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#29251f] px-5 py-3.5 text-sm text-[#fffdf8] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing in..."
                : "Sign in"}

              {!loading && (
                <ArrowUpRight size={16} />
              )}
            </button>

          </form>

        </div>

        <p className="mt-6 text-center text-xs text-[#756f64]">
          Sōma · Contemporary Indian Kitchen
        </p>

      </div>

    </div>
  )
}