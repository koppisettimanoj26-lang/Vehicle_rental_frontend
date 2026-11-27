import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { loadUserWishlist } from "../app/store";
import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try{

    
      const response = await api.get(
      `/users?email=${email}&password=${password}`
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

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  loadUserWishlist();

  toast.success(
    `Welcome ${loggedInUser.name}!`
  );

  navigate("/");

  setTimeout(() => {
    window.location.reload();
  },800);

  } else {
    toast.error("Invalid email or password!");
  }

}catch(error){
  toast.error("Login failed. please try again.");
}

      window.location.reload();
 }

  return (
<div className='auth-container'>
<div className='auth-card'>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button className='submit-btn'>
        Login
      </button>

    </form>
</div>
</div>
  );
}

export default Login;
