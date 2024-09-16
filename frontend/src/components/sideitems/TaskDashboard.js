import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import "../CSS/TaskDashboard.css"; // Custom CSS

function TaskDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

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

  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/task/getalltask",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTasks(response.data.modifiedtask);
        console.log(response.data.modifiedtask);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    }
    getAllTasks();
  }, []);

  const getStatusPercentage = (status) => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return 0;
    const statusCount = tasks.filter((task) => task.status === status).length;
    return Math.round((statusCount / totalTasks) * 100);
  };

  const handleReadMore = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleTaskClick = (taskId) => {
    console.log("Navigating to task details with ID:", taskId);
    navigate(`taskDashboard/taskdetails/:taskId/${taskId}`);
  };

  return (
    <div className="dashboard-container" style={{ marginTop: "9%" }}>
      <Container>
        {/* Header Section */}
        <Row className="align-items-center">
          <Col>
            <h3>Welcome back, {user.firstname} 👋</h3>
          </Col>
          <Col className="text-end">
            <Button variant="outline-danger" onClick={handleModalShow}>
              + Invite
            </Button>
          </Col>
        </Row>

        {/* Task Section */}
        <Row className="mt-3">
          <Col md={8} className="task-column">
            <div className="task-section">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>To-Do</h5>
                <Button
                  variant="link"
                  className="add-task-btn"
                  onClick={handleModalShow}
                >
                  <span style={{ color: "orange" }}>+</span> Add Task
                </Button>
              </div>
              <Row>
                {tasks
                  .filter((task) => task.status !== "Completed")
                  .map((task) => (
                    <Col md={12} key={task._id}>
                      <Card
                        className="mb-4 task-card shadow-sm"
                        onClick={() => handleTaskClick(task._id)} //
                      >
                        <Card.Body>
                          <Row>
                            {/* Task Text */}
                            <Col xs={8}>
                              <Card.Title>{task.title}</Card.Title>
                              <Card.Text>
                                {expandedTask === task._id
                                  ? task.description
                                  : `${task.description.substring(0, 100)}...`}
                                {task.description.length > 100 && (
                                  <Button
                                    variant="link"
                                    className="read-more-link"
                                    onClick={() => handleReadMore(task._id)}
                                  >
                                    {expandedTask === task._id
                                      ? "Read Less"
                                      : "Read More"}
                                  </Button>
                                )}
                                <br />
                                Priority:{" "}
                                <span className="priority-text">
                                  {task.priority}
                                </span>
                                {" | "}
                                Status:{" "}
                                <span className="status-text">
                                  {task.status}
                                </span>
                              </Card.Text>
                            </Col>
                            {/* Task Image */}
                            <Col xs={4} className="text-center">
                              <Image
                                src={
                                  task.image
                                    ? task.image
                                    : "http://localhost:5001/uploads/default-image.jpg"
                                }
                                rounded
                                fluid
                                style={{ width: "100px", height: "100px" }}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <Row className="mt-2">
                            <Col xs={12} className="text-end">
                              <small className="text-muted">
                                Created on:{" "}
                                {new Date(task.taskDate).toLocaleDateString()}
                              </small>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>

          {/* Task Status Section */}
          <Col md={4}>
            <div className="task-section">
              <h5>Task Status</h5>
              <div className="circle-container d-flex justify-content-between">
                {/* Container for the Circular Progress */}
                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Completed")}
                    text={`${getStatusPercentage("Completed")}%`}
                    styles={buildStyles({
                      pathColor: "green",
                      textColor: "green",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">Completed</p>
                </div>

                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Inprogress")}
                    text={`${getStatusPercentage("Inprogress")}%`}
                    styles={buildStyles({
                      pathColor: "blue",
                      textColor: "blue",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">In Progress</p>
                </div>

                <div className="circular-bar-container">
                  <CircularProgressbar
                    value={getStatusPercentage("Not started")}
                    text={`${getStatusPercentage("Not started")}%`}
                    styles={buildStyles({
                      pathColor: "red",
                      textColor: "red",
                      trailColor: "#d6d6d6",
                    })}
                  />
                  <p className="text-center mt-2">Not Started</p>
                </div>
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="task-section mt-4">
              <h5>Completed Tasks</h5>
              <Row>
                {tasks
                  .filter((task) => task.status === "Completed")
                  .map((task) => (
                    <Col key={task._id}>
                      <Card className="mb-4 task-card shadow-sm">
                        <Card.Body>
                          <Row>
                            <Col xs={8}>
                              <Card.Title>{task.title}</Card.Title>
                              <Card.Text>
                                {task.description.length > 100
                                  ? `${task.description.substring(0, 100)}...`
                                  : task.description}
                                <br />
                                Status:{" "}
                                <span className="status-text">
                                  {task.status}
                                </span>
                              </Card.Text>
                            </Col>
                            <Col xs={4} className="text-center">
                              <Image
                                src={
                                  task.image
                                    ? task.image
                                    : "http://localhost:5001/uploads/default-image.jpg"
                                }
                                rounded
                                fluid
                                style={{ width: "100px", height: "100px" }}
                              />
                            </Col>
                          </Row>
                          <hr />
                          <Row className="mt-2">
                            <Col xs={12} className="text-end">
                              <small className="text-muted">
                                Created on:{" "}
                                {new Date(task.taskDate).toLocaleDateString()}
                              </small>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>

        <AddTaskModal show={modalShow} handleClose={handleModalClose} />
      </Container>
    </div>
  );
}

export default TaskDashboard;
