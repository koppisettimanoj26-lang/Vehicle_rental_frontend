import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { loadUserWishlist } from "../app/store";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    
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

  alert(
    `Welcome ${loggedInUser.name}!`
  );

  navigate("/");

} else {
  alert("Invalid email or password!");
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
