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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/Vehicles" element={<Vehicles />} />

      <Route path="/vehicles/:id" element={<VehicleDetails />} />

    
      
      <Route
          path="/addVehicle"
          element={<ProtectedRoute><AddVehicle /></ProtectedRoute>}
      />

      <Route
          path="/editvehicles/:id"
          element={<EditVehicle />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/wishlist"
        element={<ProtectedRoute><Wishlist /></ProtectedRoute>}
      />



    </Routes>
  );
}

export default AppRoutes;