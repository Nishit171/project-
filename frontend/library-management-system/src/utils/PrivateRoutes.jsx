import { Navigate } from "react-router-dom"

const PrivateRoute = ({ component: Component, admin }) => {
  // Get user from localStorage
  const token = localStorage.getItem("token")
  const userStr = localStorage.getItem("user")
  let user = null

  try {
    if (userStr) {
      user = JSON.parse(userStr)
    }
  } catch (e) {
    console.error("Error parsing user from localStorage", e)
  }

  // Check if user is authenticated
  const isAuthenticated = token && user

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login")
    return <Navigate to="/" />
  }

  // Check if admin route and user is admin
  if (admin && user.role !== "admin") {
    console.log("Not admin, redirecting to dashboard")
    return <Navigate to="/dashboard" />
  }

  return <Component />
}

export default PrivateRoute

