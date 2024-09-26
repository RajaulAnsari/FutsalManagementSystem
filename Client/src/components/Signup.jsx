import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/kanban.svg";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch, // Include watch here
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const apiRegister = useMutation({
    mutationKey: "SIGNUP_API",
    mutationFn: (data) => {
      return axios.post("http://localhost:3000/api/customers/register", data);
    },
    onSuccess: () => {
      reset();
      alert("Registration Successful");
      navigate("/Signin");
    },
    onError: () => {
      alert("Registration Failed");
    },
  });

  const submit = (data) => {
    apiRegister.mutate(data);
  };

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="block size-20 pr-6" src={Logo} alt="Logo" />
            </Link>
            <p className="uppercase pr-6 pb-4">Futsal booking system</p>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
              Sign Up to FutsalBookingSystem
            </h2>

            <form onSubmit={handleSubmit(submit)}>
              {/* Full Name */}
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("fullname", {
                      required: "Full name is required",
                    })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaUser className="fill-current text-gray-500" />
                  </span>
                </div>
                {errors.fullname && (
                  <span className="text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("email", { required: "Email is required" })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaEnvelope className="fill-current text-gray-500" />
                  </span>
                </div>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Contact
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter Contact"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("contact", {
                      required: "Contact number is required",
                    })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaPhone className="fill-current text-gray-500" />
                  </span>
                </div>
                {errors.contact && (
                  <span className="text-red-500">{errors.contact.message}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaLock className="fill-current text-gray-500" />
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Re-type Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:focus:border-primary"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaLock className="fill-current text-gray-500" />
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-black transition hover:bg-opacity-90"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary text-blue-600">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
