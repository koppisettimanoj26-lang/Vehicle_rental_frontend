
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Vehicles from "../pages/Vehicles.jsx";
import VehicleDetails from "../pages/VehicleDetails.jsx";
import AddVehicle from "../pages/AddVehicle.jsx";
import EditVehicle from "../pages/EditVehicle.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Logout from "../pages/Logout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Wishlist from "../pages/Wishlist.jsx";
import Booking from "../pages/Bookings.jsx";
import MyBookings from "../pages/MyBookings.jsx";

function AppRoutes() {

  return (
    <Routes>

      {/* Public pages */}
      <Route path="/" element={<Home />} />

      <Route
        path="/Vehicles"
        element={<Vehicles />}
      />

      <Route
        path="/vehicles/:id"
        element={<VehicleDetails />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Admin only */}
      <Route
        path="/add-vehicle"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AddVehicle />
          </ProtectedRoute>
        }
      />


      <Route
        path="/editvehicles/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EditVehicle />
          </ProtectedRoute>
        }
      />

      {/* Both Admin and User */}
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Wishlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute allowedRoles={["admin", "user"]}>
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

    </Routes>
  );
}

export default AppRoutes;
