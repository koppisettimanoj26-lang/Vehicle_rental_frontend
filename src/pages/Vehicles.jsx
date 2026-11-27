import { useEffect, useState } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function Vehicles() {
 const [vehicles, setVehicles] =
   useState([]);

  const [search, setSearch] = useState("");
  
  const [category, setCategory] =
  useState("All");

  const [budget, setBudget] =
  useState("All");

  const [sort, setSort] =
  useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );



 useEffect(() => {
   getVehicles();
 }, []);

 async function getVehicles() {
   try {
     const response = await api.get(
       "/vehicles"
     );

     setVehicles(response.data);
   } catch (error) {
     toast.error("Failed to load vehicle!");
   }
 }

 async function deleteProduct(id) {
try{
  await api.delete(
   `/vehicles/${id}`
  );

  setVehicles(
   vehicles.filter(
     product =>
     product.id !== id
   )
  );
  toast.success("Vehicle deleted successfully!");
  }catch(error){
    toast.error("Failed to delete vehicle!");
  }
}
const filteredProducts =
  vehicles.filter(
    product => {

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const categoryMatch =
        category === "All" ||
        product.category ===
          category;
      
      const budgetMatch =
        budget === "All" ||
        product.budget === 
        budget;

      return (
        searchMatch &&
        categoryMatch &&
        budgetMatch
      );
    }
  );

  let finalProducts =
  [...filteredProducts];

if (sort === "high") {

  finalProducts.sort(
    (a, b) =>
      b.rating - a.rating
  );

}

if (sort === "low") {

  finalProducts.sort(
    (a, b) =>
      a.rating - b.rating
  );

}


 return (
   <>
     <h1>Popular Vehicles</h1>
    {user?.role === "admin" &&( 
    <Link to="/add-vehicle" className="submit-btn" style={{marginBottom: '20px',display:"inline-block",width:'20%'}}>
        Add Product
    </Link>
    )}

<div className="filters">
  <input
  type="text"
  placeholder="Search Product"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  />

<select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option>All</option>
  <option>SUV</option>
  <option>Hatchback</option>
  <option>MUV</option>
  <option>Cruiser</option>
</select>

<select
  value={budget}
  onChange={(e) =>
    setBudget(e.target.value)
  }
>
  <option>All</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>

<select
  value={sort}
  onChange={(e) =>
    setSort(e.target.value)
  }
>
  <option value="">
    Select
  </option>

  <option value="high">
    High To Low
  </option>

  <option value="low">
    Low To High
  </option>
</select>


</div>


     <div className="products">
       {finalProducts.map((vehicle) => (
         <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onDelete = {deleteProduct}
         />
       ))}
     </div>
   </>
 );
}

export default Vehicles;
