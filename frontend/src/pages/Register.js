import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const firstnamechange = (e) => setFirstname(e.target.value);
  const lastnamechange = (e) => setLastname(e.target.value);
  const usernamechange = (e) => setUsername(e.target.value);
  const emailchange = (e) => setEmail(e.target.value);
  const passwordchange = (e) => setPassword(e.target.value);
  const confirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  async function register(payload) {
    try {
      const response = await axios.post(
        "https://to-do-webapp-backend.onrender.com/api/user/register",
        payload
      );
      toast.success(response.data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
    };
    await register(payload);
  };

  return (
    <section
      className="h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#8fc4b7", minHeight: "90vh" }}
    >
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div
              className="card rounded-3"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center">
                  Registration Info
                </h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="firstname">
                      Firstname
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="form-control"
                      value={firstname}
                      onChange={firstnamechange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="lastname">
                      Lastname
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control"
                      value={lastname}
                      onChange={lastnamechange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={usernamechange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={emailchange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={passwordchange}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      value={confirmPassword}
                      onChange={confirmPasswordChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-4"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Register
                  </button>
                  <div className="text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login">
                        <span type="button" style={{ color: "blue" }}>
                          Login
                        </span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
