
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadWishlist } from "../features/wishlistSlice";
import { toast } from "react-toastify";

function Logout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    // Clear previous user's wishlist from Redux
    dispatch(loadWishlist([]));

    // Remove logged-in user
    localStorage.removeItem("user");
    toast.success("Logged out successfully");

    // Navigate to login page
    navigate("/login", { replace: true });

  }, [navigate, dispatch]);

  return null;
}

export default Logout;
