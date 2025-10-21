import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './components/BookingForm';

test('renders booking form heading and fields', () => {
  render(<BookingForm availableTimes={['17:00','18:00']} />);
  expect(screen.getByRole('heading', { name: /reserve a table/i })).toBeInTheDocument();

  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
});

test('shows validation errors when submitted empty and prevents past dates', () => {
  render(<BookingForm availableTimes={['17:00','18:00']} />);
  const submitBtn = screen.getByRole('button', { name: /make your reservation/i });
  fireEvent.click(submitBtn);

  // errors should appear
  expect(screen.getByText(/please choose a date/i)).toBeInTheDocument();
  expect(screen.getByText(/please choose a time/i)).toBeInTheDocument();

  // test past date prevention
  const dateInput = screen.getByLabelText(/choose date/i);
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  fireEvent.change(dateInput, { target: { value: yesterday }});
  fireEvent.click(submitBtn);
  expect(screen.getByText(/cannot be in the past/i)).toBeInTheDocument();
});
