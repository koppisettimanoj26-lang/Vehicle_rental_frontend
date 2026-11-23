import axios from "axios";

const api = axios.create({
 baseURL: "https://vehicle-rental-backend-fv1z.onrender.com"
});

export default api;
