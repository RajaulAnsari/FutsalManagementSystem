import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BookingForm = () => {
  const [date, setDate] = useState("");
  const [timeFromAndTo, setTimeFromAndTo] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { groundId } = useParams();

  const customerId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  const handleBooking = async (e) => {
    e.preventDefault();

    const [timeFrom, timeTo] = timeFromAndTo.split(" - ");

    const selectedDate = new Date(date);
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = daysOfWeek[selectedDate.getUTCDay()];

    const bookingData = {
      customerId,
      groundId,
      date,
      timeFrom,
      timeTo,
      day,
      status: "booked",
    };

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/api/booking", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Ground booked!");
      console.log("Booking Data:", bookingData);

      alert("Booking successful!");
      navigate("/");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getUTCHours();
    const currentDate = now.toISOString().split("T")[0];

    for (let hour = 6; hour < 22; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      const isToday = date === currentDate;
      const isDisabled = isToday && hour <= currentHour + 6;
      slots.push({ time, isDisabled });
    }
    return slots;
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-lg">
            Processing booking and sending email...
          </div>
        </div>
      ) : (
        <form
          className="bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleBooking}
        >
          <h2 className="text-lg font-bold mb-4">Book a Ground</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              className="border border-gray-300 p-2 rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayDate()}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="timeFromAndTo">
              Time From & To
            </label>
            <select
              className="border border-gray-300 p-2 rounded w-full"
              value={timeFromAndTo}
              onChange={(e) => setTimeFromAndTo(e.target.value)}
              required
              disabled={loading}
            >
              <option value="">Select a time</option>
              {generateTimeSlots().map(({ time, isDisabled }) => (
                <option
                  key={time}
                  value={`${time} - ${(parseInt(time.split(":")[0]) + 1)
                    .toString()
                    .padStart(2, "0")}:00`}
                  disabled={isDisabled || loading}
                >
                  {time} -{" "}
                  {(parseInt(time.split(":")[0]) + 1)
                    .toString()
                    .padStart(2, "0")}
                  :00
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              Book Ground
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
