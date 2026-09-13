import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add JWT automatically to protected requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("soma_admin_token")

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`
  }

  return config
})

// GET all menu items
export const getMenu = async () => {
  const response = await API.get("/menu")
  return response.data
}

// GET single menu item
export const getMenuItem = async (id) => {
  const response = await API.get(`/menu/${id}`)
  return response.data
}

// CREATE menu item
export const createMenuItem = async (
  menuItem
) => {
  const response = await API.post(
    "/menu",
    menuItem
  )

  return response.data
}

// UPDATE menu item
export const updateMenuItem = async (
  id,
  menuItem
) => {
  const response = await API.put(
    `/menu/${id}`,
    menuItem
  )

  return response.data
}

// DELETE menu item
export const deleteMenuItem = async (id) => {
  const response = await API.delete(
    `/menu/${id}`
  )

  return response.data
}

// CREATE RESERVATION
export const createReservation =
  async (reservation) => {
    const response =
      await API.post(
        "/reservations",
        reservation
      )

    return response.data
  }

// GET RESERVATIONS
export const getReservations =
  async () => {
    const response =
      await API.get(
        "/reservations"
      )

    return response.data
  }

// UPDATE RESERVATION STATUS
export const updateReservationStatus =
  async (id, status) => {
    const response =
      await API.put(
        `/reservations/${id}/status`,
        { status }
      )

    return response.data
  }

export const getAIRecommendations =
  async (craving) => {
    const response = await API.post(
      "/ai/recommend",
      {
        craving,
      }
    )

    return response.data
  }

// ADMIN LOGIN
export const loginAdmin = async (
  email,
  password
) => {
  const response = await API.post(
    "/auth/login",
    {
      email,
      password,
    }
  )

  return response.data
}

export default API