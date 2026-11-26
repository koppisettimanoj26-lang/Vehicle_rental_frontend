
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const wishlist = useSelector(
    state => state.wishlist
  );

  console.log("Logged-in user:", user);
console.log("User role:", user?.role);

  return (
    <nav>

      <Link to="/">Home</Link>

      <Link to="/Vehicles">
        Vehicles
      </Link>

      {/* Admin only */}
      {user && user.role === "admin" && (
        <>
          <Link to="/add-vehicle">
            Add Vehicle
          </Link>
        </>
      )}

      {/* Register and Login */}
      {!user && (
        <>
          <Link to="/register">
            Register
          </Link>

          <Link to="/login">
            Login
          </Link>
        </>
      )}

      {/* Logged-in users */}
      {user && (
        <>
          <Link to="/wishlist">
            Wishlist ({wishlist.length})
          </Link>

          <Link to="/my-bookings">
            Booking History
          </Link>

          <Link to="/logout">
            Logout
          </Link>

        </>
      )}

    </nav>
  );
}

export default Navbar;
