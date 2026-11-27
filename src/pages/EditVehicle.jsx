import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function EditVehicle() {

 const { id } = useParams();

 const navigate = useNavigate();

 const [formData, setFormData] =
   useState({
     name: "",
     brand: "",
     image: "",
     description: ""
   });

 useEffect(() => {
   getProduct();
 }, []);

 async function getProduct() {

   const response =
     await api.get(
       `/vehicles/${id}`
     );

   setFormData(response.data);
 }

 function handleChange(e) {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 }

 async function handleSubmit(e) {

   e.preventDefault();
  try{
   await api.put(
     `/vehicles/${id}`,
     formData
   );

   toast.success("Vehicle updated succesfully!");

   navigate("/vehicles");

  }catch(error){
    toast.error("Failed to update vehicle!");
  }
 }

 return (
<div className='form-container'>
   <form onSubmit={handleSubmit}>

     <input
       type="text"
       name="name"
       value={formData.name}
       onChange={handleChange}
     />

     <input
       type="text"
       name="brand"
       value={formData.brand}
       onChange={handleChange}
     />

     <input
       type="text"
       name="image"
       value={formData.image}
       onChange={handleChange}
     />

     <textarea
       name="description"
       value={formData.description}
       onChange={handleChange}
     />

     <button  className='submit-btn'>
       Update Product
     </button>

   </form>
</div>
 );
}

export default EditVehicle;
