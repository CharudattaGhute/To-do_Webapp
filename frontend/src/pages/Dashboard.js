import React, { useEffect, useState } from "react";
import { Nav, Container, Image } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import TaskDashboard from "../components/sideitems/TaskDashboard";
import Navbar from "../components/Navbar";
import AdTaskModal from "../components/sideitems/AddTaskModal";
import Categories from "../components/sideitems/Categories";
import CreateCategoryForm from "../components/sideitems/CreatecategoryForm";
import Vitaltask from "../components/sideitems/Vitaltask";
import Mytask from "../components/sideitems/Mytask";
import Accountinfo from "../components/sideitems/Accountinfo";
import { useNavigate } from "react-router-dom";

import "../components/CSS/dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate;

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/userinfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="d-flex" style={{ marginTop: "3%" }}>
        <div
          className="d-flex flex-column bg-danger text-white p-3 sidebar"
          id="sidebar"
        >
          <div className="profile-pic-container">
            <Nav.Link as={Link} to="Accountinfo" className="text-white mb-3">
              <img
                src="data:image/png;base64,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"
                alt="Profile"
                className="profile-pic"
              />
            </Nav.Link>
          </div>
          <div className="text-center mt-5">
            <h5>
              {user.firstname}
              <span style={{ marginLeft: "7px" }}>{user.lastname}</span>
            </h5>
            <p>{user.email}</p>
          </div>

          <Nav className="d-flex flex-column vh-100">
            <div>
              <Nav.Link
                as={Link}
                to="taskDashboard"
                className="text-white mb-3"
              >
                <i className="bi bi-grid-fill me-2"></i> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="vitaltask" className="text-white mb-3">
                <i className="bi bi-exclamation-circle-fill me-2"></i> Vital
                Task
              </Nav.Link>
              <Nav.Link as={Link} to="my-task" className="text-white mb-3">
                <i className="bi bi-list-task me-2"></i> My Task
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="task-categories"
                className="text-white mb-3"
              >
                <i className="bi bi-folder-fill me-2"></i> Task Categories
              </Nav.Link>
              <Nav.Link as={Link} to="settings" className="text-white mb-3">
                <i className="bi bi-gear-fill me-2"></i> Settings
              </Nav.Link>
              <Nav.Link as={Link} to="help" className="text-white mb-3">
                <i className="bi bi-question-circle-fill me-2"></i> Help
              </Nav.Link>
            </div>

            <Nav.Link className="text-white mb-3 mt-auto" onClick={logout}>
              <i className="bi bi-box-arrow-left me-2"></i> Logout
            </Nav.Link>
          </Nav>
        </div>

        <div
          className="content"
          style={{ marginLeft: "40px", padding: "10px", width: "100%" }}
        >
          <Routes>
            <Route path="taskDashboard" element={<TaskDashboard />} />
            <Route path="vitaltask" element={<Vitaltask />} />
            <Route path="my-task" element={<Mytask />} />
            <Route path="task-categories/*" element={<Categories />} />
            <Route path="settings" element={<h1>Settings</h1>} />
            <Route path="help" element={<h1>Help</h1>} />

            <Route path="ad-task" element={<AdTaskModal />} />
            <Route
              path="task-categories/createcategory"
              element={<CreateCategoryForm />}
            />
            <Route path="Accountinfo" element={<Accountinfo />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
