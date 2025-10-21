import React, { useState, useRef } from "react";

/**
 * BookingForm (updated)
 * - Replaces alert() usage with inline error messages and aria-live announcements
 * - Keeps compatibility with props.dispatch and props.submitForm from existing app
 * - Disallows past dates, enforces guests between 1 and 10 (configurable)
 */

const BookingForm = (props) => {
  const [occasion, setOccasion] = useState("");
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [times, setTimes] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const liveRef = useRef(null);

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  function validate() {
    const newErrors = {};

    if (!date) newErrors.date = "Please choose a date.";
    else {
      const selected = new Date(date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      if (selected < now) newErrors.date = "Reservation date cannot be in the past.";
    }

    if (!times) newErrors.times = "Please choose a time.";
    if (!occasion) newErrors.occasion = "Please select an occasion.";
    if (!guests && guests !== 0) newErrors.guests = "Please specify number of guests.";
    else if (parseInt(guests, 10) < 1 || parseInt(guests, 10) > 10)
      newErrors.guests = "Number of guests must be between 1 and 10.";

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setSubmitting(true);
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      // Announce first error to screen readers
      if (liveRef.current) {
        liveRef.current.focus();
      }
      setSubmitting(false);
      return;
    }

    try {
      // call existing submitForm prop if provided (Main.js handles navigation)
      if (props.submitForm) {
        // pass a sanitized payload rather than raw event
        const payload = { occasion, guests: Number(guests), date, times };
        await Promise.resolve(props.submitForm(payload));
      }
    } catch (err) {
      setErrors({ submit: "Failed to submit reservation. Please try again." });
      if (liveRef.current) liveRef.current.focus();
    } finally {
      setSubmitting(false);
    }
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (props.dispatch) props.dispatch(selectedDate);
  };

  return (
    <header>
      <section aria-labelledby="reservation-heading">
        <h2 id="reservation-heading">Reserve a table</h2>

        {/* Live error region for screen readers */}
        <div
          tabIndex="-1"
          ref={liveRef}
          aria-live="assertive"
          aria-atomic="true"
          style={{ outline: "none" }}
        >
          {errors.submit && (
            <div className="form-errors" role="alert">
              {errors.submit}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <fieldset className="formField" aria-describedby="form-instructions">
            <p id="form-instructions" className="sr-only">
              Use this form to reserve a table. All fields are required unless
              specified.
            </p>

            <div className="field">
              <label htmlFor="book-date">Choose date</label>
              <input
                id="book-date"
                name="date"
                type="date"
                value={date}
                min={today} /* disallow past dates */
                onChange={handleDateChange}
                aria-invalid={errors.date ? "true" : "false"}
                aria-describedby={errors.date ? "date-error" : undefined}
                required
              />
              {errors.date && (
                <p id="date-error" className="field-error" role="alert">
                  {errors.date}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="book-time">Choose time</label>
              <select
                id="book-time"
                name="times"
                value={times}
                onChange={(e) => setTimes(e.target.value)}
                aria-invalid={errors.times ? "true" : "false"}
                aria-describedby={errors.times ? "time-error" : undefined}
                required
              >
                <option value="">-- Select time --</option>
                {props.availableTimes && props.availableTimes.length > 0 ? (
                  props.availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))
                ) : (
                  <>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                  </>
                )}
              </select>
              {errors.times && (
                <p id="time-error" className="field-error" role="alert">
                  {errors.times}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="guests">Number of guests</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                aria-invalid={errors.guests ? "true" : "false"}
                aria-describedby={errors.guests ? "guests-error" : undefined}
                required
              />
              {errors.guests && (
                <p id="guests-error" className="field-error" role="alert">
                  {errors.guests}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                name="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                aria-invalid={errors.occasion ? "true" : "false"}
                aria-describedby={errors.occasion ? "occasion-error" : undefined}
                required
              >
                <option value="">-- Select an occasion --</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Business</option>
                <option>Other</option>
              </select>
              {errors.occasion && (
                <p id="occasion-error" className="field-error" role="alert">
                  {errors.occasion}
                </p>
              )}
            </div>

            <div className="btnReceive">
              <button
                type="submit"
                aria-label="Make your reservation"
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Make Your Reservation"}
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;
