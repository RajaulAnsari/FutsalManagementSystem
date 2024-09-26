import React, { useEffect, useState } from "react";
import axios from "axios";
import GroundCard from "../components/GroundCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/grounds")
      .then((response) => {
        setGrounds(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching grounds:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (!Array.isArray(grounds)) {
    return <div className="text-center text-xl">No grounds available</div>;
  }

  const handleGroundClick = (groundId) => {
    if (token) {
      navigate(`/bookingform/${groundId}`);
    } else {
      localStorage.setItem("groundId", groundId);
      navigate(`/signin`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Available Futsal Grounds
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {grounds.map((ground) => (
          <div key={ground._id} onClick={() => handleGroundClick(ground._id)}>
            <GroundCard grounds={ground} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
