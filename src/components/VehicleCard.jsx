
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWishlist } from "../features/wishlistSlice";

function VehicleCard({ vehicle, onDelete, onEdit }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="card">

      {/* Vehicle Image and Wishlist Heart */}
      <div className="card-image">

        <img
          src={vehicle.image}
          alt={vehicle.name}
        />

        <button
          className="vehicle-wishlist-icon"
          onClick={() => dispatch(addWishlist(vehicle))}
          title="Add to Wishlist"
        >
          ♥
        </button>

      </div>

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

        {user && user.role === "admin" && (
          <>
            <button
              className="edit-btn"
              onClick={() => onEdit(vehicle.id)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(vehicle.id)}
            >
              Delete
            </button>
          </>
        )}

        {user && user.role === "user" && (
          <button
            className="edit-btn"
            onClick={() =>
              navigate("/booking", {
                state: { vehicle: vehicle }
              })
            }
          >
            Book Now
          </button>
        )}

      </div>

    </div>
  );
}

export default VehicleCard;
