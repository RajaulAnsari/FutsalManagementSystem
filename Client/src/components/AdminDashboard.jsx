import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const AdminDashboard = () => {
  const [grounds, setGrounds] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentGround, setCurrentGround] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/admin";
    } else {
      axios
        .get("http://localhost:3000/api/grounds", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setGrounds(response.data);
        })
        .catch((error) => {
          console.error("Error fetching grounds:", error);
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/admin";
          }
        });
    }
  }, []);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const token = localStorage.getItem("token");

    if (editMode && currentGround) {
      axios
        .put(
          `http://localhost:3000/api/grounds/${currentGround._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setGrounds(
            grounds.map((ground) =>
              ground._id === currentGround._id ? response.data : ground
            )
          );
          resetForm();
        })
        .catch((error) => {
          console.error("Error editing ground:", error);
        });
    } else {
      axios
        .post("http://localhost:3000/api/grounds", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setGrounds([...grounds, response.data]);
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding ground:", error);
        });
    }
  };

  const handleDeleteGround = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/api/grounds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setGrounds(grounds.filter((ground) => ground._id !== id));
        alert("Are You sure Want to Delete!!!");
      })
      .catch((error) => {
        console.error("Error deleting ground:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin";
  };

  const handleBookingDetails = () => {
    window.location.href = "/bookingdetails";
  };

  const resetForm = () => {
    reset({ name: "", description: "" });
    setSelectedFile(null);
    setEditMode(false);
    setCurrentGround(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleEditClick = (ground) => {
    setEditMode(true);
    setCurrentGround(ground);
    reset({ name: ground.name, description: ground.description });
    setSelectedFile(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
      >
        Logout
      </button>
      <button
        onClick={handleBookingDetails}
        className="ml-2 bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        BookingDetails
      </button>

      <div className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">
          {editMode ? "Edit Ground" : "Add New Ground"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 max-w-lg"
        >
          <input
            {...register("name", { required: "Ground name is required" })}
            placeholder="Ground Name"
            className="p-2 border border-gray-300 rounded text-black"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <input
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded text-black"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}

          <input
            required
            type="file"
            ref={fileInputRef}
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="p-2 border border-gray-300 rounded text-black"
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {editMode ? "Update Ground" : "Add Ground"}
          </button>
          {editMode && (
            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded mt-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Grounds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {grounds.map((ground) => (
            <div
              key={ground._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={`http://localhost:3000/api/uploads/${ground.image}`}
                alt={ground.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{ground.name}</h3>
                <p className="text-gray-600">{ground.description}</p>
                <button
                  onClick={() => handleEditClick(ground)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 mt-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGround(ground._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
