import React, { useEffect, useState } from "react";
import { Nav, Container, Image } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaTasks,
  FaCog,
  FaExclamationCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import axios from "axios";
import { Link, Routes, Route } from "react-router-dom";
import "./Sidebar.css";
import TaskDashboard from "../components/sideitems/TaskDashboard";

const Dashboard = () => {
  const [user, setUser] = useState({});

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

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar fixed-left">
        <Container className="text-center mt-3">
          <Image
            src="https://via.placeholder.com/100"
            roundedCircle
            className="mb-3"
          />
          <h5>
            {user.firstname}
            <span style={{ marginLeft: "7px" }}>{user.lastname}</span>
          </h5>
          <p>{user.email}</p>
        </Container>

        <Nav className="flex-column">
          <Nav.Link as={Link} to="taskhome" className="nav-link-custom">
            <FaTachometerAlt /> Dashboard
          </Nav.Link>

          <Nav.Link as={Link} to="vitaltask" className="nav-link-custom">
            <FaExclamationCircle /> Vital Task
          </Nav.Link>

          <Nav.Link as={Link} to="my-task" className="nav-link-custom">
            <FaTasks /> My Task
          </Nav.Link>

          <Nav.Link as={Link} to="task-categories" className="nav-link-custom">
            <FaTasks /> Task Categories
          </Nav.Link>

          <Nav.Link as={Link} to="settings" className="nav-link-custom">
            <FaCog /> Settings
          </Nav.Link>

          <Nav.Link as={Link} to="help" className="nav-link-custom">
            <FaQuestionCircle /> Help
          </Nav.Link>

          <Nav.Link as={Link} to="logout" className="nav-link-custom">
            <FaQuestionCircle /> Logout
          </Nav.Link>
        </Nav>
      </div>

      {/* Main content area */}
      <div
        className="content"
        style={{ marginLeft: "250px", padding: "20px", width: "100%" }}
      >
        <Routes>
          <Route path="taskhome" element={<TaskDashboard />} />
          <Route path="vitaltask" element={<h1>Vital Task</h1>} />
          <Route path="my-task" element={<h1>My Task</h1>} />
          <Route path="task-categories" element={<h1>Task Categories</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="help" element={<h1>Help</h1>} />
          <Route path="logout" element={<h1>Logout</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
