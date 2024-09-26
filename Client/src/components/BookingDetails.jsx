import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/booking`)
      .then((response) => {
        setBooking(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching booking details");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!booking || booking.length === 0) {
    return <div>No booking details available</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Booking Details</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 ">
        <thead className="bg-green-100 uppercase ">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.N.</th>
            <th className="border border-gray-300 px-4 py-2">Customer Name</th>
            <th className="border border-gray-300 px-4 py-2">Customer Email</th>
            <th className="border border-gray-300 px-4 py-2">
              Customer Contact
            </th>
            <th className="border border-gray-300 px-4 py-2">Ground Name</th>
            <th className="border border-gray-300 px-4 py-2">
              Booking Day & Date
            </th>
            <th className="border border-gray-300 px-4 py-2">Time From & To</th>
            <th className="border border-gray-300 px-4 py-2">Booking Status</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((booking, index) => {
            const {
              customerId,
              groundId,
              date,
              timeFrom,
              timeTo,
              day,
              status,
            } = booking;
            return (
              <tr key={booking._id} className="even:bg-green-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {customerId.fullname}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  {customerId.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  {customerId.contact}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  {groundId.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  {day}, {new Date(date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">
                  {timeFrom} - {timeTo}
                </td>
                <td className="border border-gray-300 px-4 py-2 ">{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetails;
