import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmedBooking = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');
  const handleBookAgain = () => navigate('/booking');

  return (
    <main className="confirmed-booking">
      <section className="confirmed-container text-center">
        <h1>
          Booking has been <span className="highlight">Confirmed!</span>
        </h1>
        <p>Thank you for choosing Little Lemon. We look forward to serving you.</p>

        <div className="cta-buttons">
          <button className="btn primary" onClick={handleGoHome}>
            Return to Home
          </button>
          <button className="btn secondary" onClick={handleBookAgain}>
            Make Another Booking
          </button>
        </div>
      </section>
    </main>
  );
};

export default ConfirmedBooking;
