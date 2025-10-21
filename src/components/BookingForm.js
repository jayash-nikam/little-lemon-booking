import React, { useState } from "react";

const BookingForm = (props) => {
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation before submission
    if (!date || !times || !guests || !occasion) {
      alert("Please fill out all fields.");
      return;
    }

    if (parseInt(guests) < 1 || parseInt(guests) > 10) {
      alert("Number of guests must be between 1 and 10.");
      return;
    }

    props.submitForm(e);
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    props.dispatch(selectedDate);
  };

  return (
    <header>
      <section>
        <form onSubmit={handleSubmit}>
          <fieldset className="formField">
            <div>
              <label htmlFor="book-date">Choose Date:</label>
              <input
                id="book-date"
                type="date"
                value={date}
                min={today} // disallow past dates
                onChange={handleDateChange}
                required
              />
            </div>

            <div>
              <label htmlFor="book-time">Choose Time:</label>
              <select
                id="book-time"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                required
              >
                <option value="">Select a Time</option>
                {props.availableTimes.availableTimes.map((availableTime) => (
                  <option key={availableTime} value={availableTime}>
                    {availableTime}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="book-guests">Number of Guests:</label>
              <input
                id="book-guests"
                type="number"
                placeholder="1"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="book-occasion">Occasion:</label>
              <select
                id="book-occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                required
              >
                <option value="">Select an Option</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Graduation">Graduation</option>
                <option value="Engagement">Engagement</option>
              </select>
            </div>

            <div className="btnReceive">
              <input
                aria-label="On Click"
                type="submit"
                value="Make Your Reservation"
              />
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;
