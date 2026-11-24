
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">
          <h1>TAJ TRAVELS</h1>

          <h2>Explore The World With Comfort</h2>

          <p>
            Start your Happy and Safe Trips with Us.
            Choose your favourite vehicle and enjoy
            your journey with comfort.
          </p>

          <Link to="/vehicles" className="explore-btn">
            Explore Vehicles →
          </Link>
        </div>

      </section>

      {/* Features Section */}
      <section className="features-section">

        <h2>Why Choose TAJ Travels?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <span>🚗</span>
            <h3>Wide Vehicle Options</h3>
            <p>Choose from a variety of cars and bikes.</p>
          </div>

          <div className="feature-card">
            <span>💰</span>
            <h3>Affordable Pricing</h3>
            <p>Enjoy comfortable rides at reasonable prices.</p>
          </div>

          <div className="feature-card">
            <span>🛡️</span>
            <h3>Safe Travels</h3>
            <p>Your safety and comfort are our priority.</p>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready For Your Next Adventure?</h2>
        <p>Find your perfect ride and start travelling today!</p>

        <Link to="/vehicles" className="cta-btn">
          Book Your Ride
        </Link>
      </section>

    </div>
  );
}

export default Home;

