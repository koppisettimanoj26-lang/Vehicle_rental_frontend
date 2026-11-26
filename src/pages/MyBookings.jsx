
import { useSelector } from "react-redux";
import { cancelBooking } from "../features/bookingSlice";
import "./MyBookings.css";
import { useDispatch } from "react-redux";

function MyBookings() {

  // Get bookings from Redux store

  const dispatch = useDispatch();


 const user = JSON.parse(
  localStorage.getItem("user")
  );

const allBookings = useSelector(
  state => state.bookings
);

const bookings =
  user?.role === "admin"
    ? allBookings
    : allBookings.filter(
        booking =>
          String(booking.userId) === String(user.id)
      );

  return (
    <div className="my-bookings-container">

      <h1>My Bookings</h1>

      {bookings.length === 0 ? (

        <p>You have no bookings yet.</p>

      ) : (

        bookings.map((booking) => (

          <div
            className="booking-card"
            key={booking.id}
          >

            <img
              src={booking.vehicleImage}
              alt={booking.vehicleName}
            />

            <h2>{booking.vehicleName}</h2>

            <p>
              Customer: {booking.customerName}
            </p>

            <p>
              Phone: {booking.phone}
            </p>

            <p>
              Pickup Date: {booking.pickupDate}
            </p>

            <p>
              Return Date: {booking.returnDate}
            </p>

            <p>
              Rental Days: {booking.rentalDays}
            </p>

            <p>
              Price Per Day: ₹{booking.dailyPrice}
            </p>

            <h3>
              Total Amount: ₹{booking.totalAmount}
            </h3>

            <p>
              Status: {booking.status}
            </p>

             <button
             className="delete-btn"
             onClick={() => {
            dispatch(cancelBooking(booking.id));
        }}
        >
            Delete Booking
        </button>

          </div>

        ))

      )}

    </div>
  );
}

export default MyBookings;
