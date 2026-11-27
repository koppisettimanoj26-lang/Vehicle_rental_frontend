
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadWishlist } from "../features/wishlistSlice";
import { toast } from "react-toastify";

function Logout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutDone = useRef(false);

  useEffect(() => {

    if (logoutDone.current) return;

    logoutDone.current = true;

    // Clear previous user's wishlist from Redux
    dispatch(loadWishlist([]));

    // Remove logged-in user
    sessionStorage.removeItem("user");

    // Show notification
    toast.success("Logged out successfully!");

    // Navigate to login
    navigate("/login", { replace: true });

  }, [navigate, dispatch]);

  return null;
}

export default Logout;
