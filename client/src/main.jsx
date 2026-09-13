import { StrictMode, useState } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"

import App from "./App.jsx"
import AdminApp from "./admin/AdminApp.jsx"
import AdminLogin from "./admin/AdminLogin.jsx"

import Story from "./pages/Story.jsx"
import Visit from "./pages/Visit.jsx"

function AdminRoot() {
  const [authenticated, setAuthenticated] =
    useState(
      Boolean(
        localStorage.getItem(
          "soma_admin_token"
        )
      )
    )

  const handleLogin = () => {
    setAuthenticated(true)
  }

  if (!authenticated) {
    return (
      <AdminLogin
        onLogin={handleLogin}
      />
    )
  }

  return <AdminApp />
}

const path = window.location.pathname

const isAdmin = path.startsWith("/admin")

function PublicRoot() {
  if (path === "/story") {
    return <Story />
  }

  if (path === "/visit") {
    return <Visit />
  }

  return <App />
}

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    {isAdmin ? <AdminRoot /> : <PublicRoot />}
  </StrictMode>
)