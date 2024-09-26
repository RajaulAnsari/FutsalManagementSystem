import React from "react";
import { useNavigate } from "react-router-dom";

const GroundCard = ({ grounds }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleBookingClick = () => {
    if (token) {
      navigate("/bookingform", { state: { groundId: grounds._id } });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={`http://localhost:3000/api/uploads/${grounds.image}`}
        alt={grounds.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{grounds.name}</h3>
        <p className="text-gray-600 mb-4">{grounds.description}</p>
        <button
          className="bg-red-500 hover:bg-yellow-800 text-white py-2 px-4 rounded uppercase"
          onClick={handleBookingClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default GroundCard;
