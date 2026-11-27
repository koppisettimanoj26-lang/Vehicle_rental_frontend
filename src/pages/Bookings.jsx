
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addBooking } from "../features/bookingSlice";
import "./Booking.css";
import { toast } from "react-toastify";

function Booking() {

  const user = JSON.parse(
  sessionStorage.getItem("user")
);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get selected vehicle
  const vehicle = location.state?.vehicle;

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Get today's date in local YYYY-MM-DD format
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  // Calculate rental days
  const rentalDays =
    pickupDate && returnDate
      ? Math.ceil(
          (new Date(returnDate + "T00:00:00").getTime() -
           new Date(pickupDate + "T00:00:00").getTime())
          / (1000 * 60 * 60 * 24)
        )
      : 0;

  // Calculate total price
        const dailyPrice = Number(vehicle?.pricePerDay || 0);

        const totalAmount =
        rentalDays > 0
        ? rentalDays * dailyPrice
        : 0;

  // Handle booking confirmation
  
function handleBooking(e) {

  e.preventDefault();

  if (!vehicle) {
    toast.error("Please select a vehicle!");
    return;
  }

  if (rentalDays <= 0) {
    toast.error("Return date must be after pickup date!");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    toast.error("Enter a valid 10-digit mobile number!");
    return;
  }

  // Get daily rental price
  const dailyPrice = Number(vehicle.pricePerDay);

  if (!dailyPrice || dailyPrice <= 0) {
    toast.error("Vehicle price is not available!");
    return;
  }

  // Calculate total amount
  const calculatedAmount = rentalDays * dailyPrice;

  const booking = {
  id: Date.now(),
  userId: user.id,
  userEmail: user.email,


  // Vehicle details
  vehicleId: vehicle.id,
  vehicleName: vehicle.name,
  vehicleBrand: vehicle.brand,
  vehicleImage: vehicle.image,

  // Price details
  dailyPrice: dailyPrice,
  rentalDays: rentalDays,
  totalAmount: totalAmount,

  // Customer details
  customerName: customerName,
  phone: phone,

  // Rental dates
  pickupDate: pickupDate,
  returnDate: returnDate,

  // Booking status
  status: "Confirmed"
};

  dispatch(addBooking(booking));

  toast.success("Vehicle booked successfully!");

  navigate("/my-bookings");
}



  // Handle missing vehicle
  if (!vehicle) {
    return (
      <div>
        <h2>No vehicle selected</h2>
        <button onClick={() => navigate("/products")}>
          Explore Vehicles
        </button>
      </div>
    );
  }

  return (

    <div className="booking-container">

      <h1>Book Your Vehicle</h1>

      {/* Vehicle Details */}
      <div className="booking-vehicle">

        <img
          src={vehicle.image}
          alt={vehicle.name}
        />

        <div>
          <h2>{vehicle.name}</h2>
          <p>{vehicle.brand}</p>
          <h3>₹{vehicle.price} / day</h3>
        </div>

      </div>

      {/* Booking Form */}
      <form onSubmit={handleBooking}>

        <h2>Customer Details</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          required
        />

        <input
          type="tel"
          placeholder="10-digit Mobile Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          pattern="[0-9]{10}"
          maxLength="10"
          required
        />

        <h2>Rental Details</h2>

        <label>Pickup Date</label>

        <input
          type="date"
          min={minDate}
          value={pickupDate}
          onChange={(e) => {
            setPickupDate(e.target.value);
            setReturnDate("");
          }}
          required
        />

        <label>Return Date</label>

        <input
          type="date"
          min={pickupDate || minDate}
          value={returnDate}
          onChange={(e) =>
            setReturnDate(e.target.value)
          }
          required
        />

        {/* Price Details */}
        <div className="booking-summary">

          <p>
            Rental Days: {rentalDays > 0 ? rentalDays : 0}
          </p>

          <p>
            Price Per Day: ₹{vehicle.pricePerDay}
          </p>

          <h2>
            Total Amount: ₹{totalAmount}
          </h2>

        </div>

        <button type="submit">
          Confirm Booking
        </button>

      </form>

    </div>

  );
}

export default Booking;
