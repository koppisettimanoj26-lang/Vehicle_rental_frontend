
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Check whether user is logged in
  if (!user) {
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
