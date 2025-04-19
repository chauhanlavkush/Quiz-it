import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces")
      .required("Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net)$/,
        "Email must end with .com, .in, .org, or .net"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    reEnterPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  

  const register = async () => {
    try {
      await schema.validate(user, { abortEarly: false });

      axios
        .post("https://mern-quiz-server-sudhir.onrender.com/register", user)
        .then((res) => {
          toast.success("Successfully Registered");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          toast.error("Registration failed. Try again.");
        });
    } catch (validationError) {
      validationError.inner.forEach((err) => toast.error(err.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="flex w-4/5 registermain justify-around m-auto mt-10">
      <div className="register w-1/2 h-96 ml-24">
        <p className="text-2xl font-semibold">Register</p>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="Your Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="Your Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Your Password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="reEnterPassword"
          value={user.reEnterPassword}
          placeholder="Re-enter Password"
          onChange={handleChange}
        />
        <button
          className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white text-xl"
          onClick={register}
        >
          Register
        </button>
        <ToastContainer />
        <div>OR</div>
        <Link to="/login">
          <div className="p-2 pl-36 pr-28 clicablediv bg-blue-500 h-10 rounded-md text-white text-xl">
            Login
          </div>
        </Link>
      </div>
      <button className="mb-8 w-1/2 ml-48">
        <img src="./register.gif" alt="registergif" />
      </button>
    </div>
  );
};
