import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddVehicle() {

 const navigate = useNavigate();

 const [formData, setFormData] = useState({
   name: "",
   brand: "",
   image: "",
   description: ""
 });

 function handleChange(e) {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 }

 async function handleSubmit(e) {
   e.preventDefault();
  try{
   await api.post(
     "/vehicles",
     formData
   );

   toast.success("Vehicle added successfully!");

   navigate("/vehicles");
  }catch(error){
    toast.error("Failed to add vehicle!");
  }
 }

 return (
<div className='form-container'>
<form onSubmit={handleSubmit}>

     <input
       type="text"
       name="name"
       placeholder="Name"
       onChange={handleChange}
     />

     <input
       type="text"
       name="brand"
       placeholder="Brand"
       onChange={handleChange}
     />

     <input
       type="text"
       name="image"
       placeholder="Image URL"
       onChange={handleChange}
     />

     <textarea
       name="description"
       placeholder="Description"
       onChange={handleChange}
     />

     <button className='submit-btn'>
       Add Vehicle
     </button>

   </form>
</div>
 );
}

export default AddVehicle;
