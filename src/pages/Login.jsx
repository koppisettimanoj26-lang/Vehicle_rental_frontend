
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { loadUserWishlist } from "../app/store";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await api.get(
        `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (response.data.length > 0) {

        const loggedInUser = response.data[0];

        // Store user details without password
        const userData = {
          id: loggedInUser.id,
          name: loggedInUser.name,
          email: loggedInUser.email,
          role: loggedInUser.role
        };

        // Save user in LocalStorage
        sessionStorage.setItem(
          "user",
        JSON.stringify(userData)
        );

        // Load user's wishlist
        loadUserWishlist();

        toast.success(`Welcome ${loggedInUser.name}!`);

        // Redirect based on role
        if (userData.role === "admin") {
          navigate("/", { replace: true });
        } else if (userData.role === "user") {
          navigate("/", { replace: true });
        } else {
          localStorage.removeItem("user");
          toast.error("Invalid user role!");
        }

      } else {

        toast.error("Invalid email or password!");

      }

    } catch (error) {

      console.log(error);
      toast.error("Login failed. Please try again.");

    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="submit-btn" type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
