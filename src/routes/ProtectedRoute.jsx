
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

  let user = null;

  try {
    user = JSON.parse(sessionStorage.getItem("user"));
  } catch (error) {
    sessionStorage.removeItem("user");
  }

  // Check whether user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check whether user has a valid role
  if (!["admin", "user"].includes(user.role)) {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Check whether user's role is allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
