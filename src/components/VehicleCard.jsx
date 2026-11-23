import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWishlist } from "../features/wishlistSlice";

function VehicleCard({ vehicle, onDelete }) {

  const dispatch = useDispatch();

 return (
   <div className="card">
     <img
       src={vehicle.image}
       alt={vehicle.name}
     />

     <h3>{vehicle.name}</h3>

     <p>{vehicle.brand}</p>

     <p>{vehicle.category}</p>

     <p>⭐ {vehicle.rating}</p>

    <div className="card-actions">
     <Link
      className="view-btn"
       to={`/vehicles/${vehicle.id}`}
     >
       View Details
     </Link>

     <Link
        className="edit-btn"
        to={`/editvehicles/${vehicle.id}`}
     >
        Edit
     </Link>

     <button
        className="delete-btn"
        onClick={() =>
        onDelete(vehicle.id)
     }
    >
        Delete
    </button>
</div>
    <button
     className="edit-btn"
     onClick={()=>dispatch(addWishlist(vehicle))}>
      ❤ Add To Wishlist
    </button>


   </div>
 );
}

export default VehicleCard;
