import { useEffect, useState } from "react"

import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import MenuManager from "./components/MenuManager"
import MenuForm from "./components/MenuForm"
import Reservations from "./components/Reservations"
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../api/api"

export default function AdminApp() {
  const [activePage, setActivePage] =
    useState("Dashboard")

  const [menuItems, setMenuItems] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [showForm, setShowForm] =
    useState(false)

  const [editingItem, setEditingItem] =
    useState(null)

  const fetchMenu = async () => {
    try {
      const result = await getMenu()

      setMenuItems(result.data)
    } catch (error) {
      console.error(
        "Failed to fetch menu:",
        error
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  // DELETE
  const handleDelete = async (id) => {
    await deleteMenuItem(id)

    setMenuItems((currentItems) =>
      currentItems.filter(
        (item) => item._id !== id
      )
    )
  }

  // OPEN ADD FORM
  const handleAdd = () => {
    setEditingItem(null)
    setShowForm(true)
  }

  // OPEN EDIT FORM
  const handleEdit = (item) => {
    setEditingItem(item)
    setShowForm(true)
  }

  // CREATE OR UPDATE
  const handleSubmit = async (menuItem) => {
    if (editingItem) {
      const result =
        await updateMenuItem(
          editingItem._id,
          menuItem
        )

      setMenuItems((currentItems) =>
        currentItems.map((item) =>
          item._id === editingItem._id
            ? result.data
            : item
        )
      )
    } else {
      const result =
        await createMenuItem(menuItem)

      setMenuItems((currentItems) => [
        result.data,
        ...currentItems,
      ])
    }

    setShowForm(false)
    setEditingItem(null)
  }

  // CLOSE FORM
  const handleCloseForm = () => {
    setShowForm(false)
    setEditingItem(null)
  }

  return (
    <div className="flex min-h-screen bg-[#f7f1e7] text-[#29251f]">

      <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
  onLogout={() => {
    localStorage.removeItem(
      "soma_admin_token"
    )

    localStorage.removeItem(
      "soma_admin"
    )

    window.location.href = "/admin"
  }}
/>

      <main className="min-w-0 flex-1 overflow-y-auto p-8 md:p-10">

        <div className="mx-auto max-w-6xl">

          {loading ? (
            <div className="flex min-h-[80vh] items-center justify-center">
              <p className="text-sm text-[#756f64]">
                Loading dashboard...
              </p>
            </div>
          ) : (
            <>
              {activePage === "Dashboard" && (
                <Dashboard
                  menuItems={menuItems}
                />
              )}

              {activePage === "Menu" && (
                <MenuManager
                  menuItems={menuItems}
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}

              {activePage === "Reservations" && (
  <Reservations />
)}
            </>
          )}

        </div>

      </main>

      {/* Add / Edit Form */}
      {showForm && (
        <MenuForm
          initialData={editingItem}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

    </div>
  )
}