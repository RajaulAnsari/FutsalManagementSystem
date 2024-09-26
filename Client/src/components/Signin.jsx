import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/kanban.svg";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const apiLogin = useMutation({
    mutationKey: "LOGIN_API",
    mutationFn: (data) => {
      return axios.post("http://localhost:3000/api/customers/login", data);
    },
  });

  const submit = (data) => {
    apiLogin.mutate(data, {
      onSuccess(res) {
        console.log(res);
        localStorage.setItem("token", res?.data?.token);
        const groundId = localStorage.getItem("groundId");
        if (groundId) {
          window.location.href = `/BookingForm/${groundId}`;
          localStorage.removeItem("groundId");
        } else {
          window.location.href = "/";
        }
      },
    });
  };

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Link className="mb-5.5 inline-block" to="/">
              <img className="block size-20 pr-6" src={Logo} alt="Logo" />
            </Link>
            <p className="pr-6 pb-4 uppercase">Footsal Booking System</p>
          </div>
        </div>

        <div className="text-black w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
              Sign In to FootsalBookingSystem
            </h2>

            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email", { required: "Email is required" })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaEnvelope className="text-gray-400" />
                  </span>
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="8+ Characters, 1 Capital letter"
                    className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-strokedark dark:bg-form-input dark:focus:border-primary ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <span className="absolute right-4 top-4">
                    <FaLock className="text-gray-400" />
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-black transition hover:bg-opacity-90"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{" "}
                  <Link to="/signup" className="text-primary text-blue-600">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
