import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";
import "../CSS/TaskDashboard.css";

function TaskDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

  const [expandedTask, setExpandedTask] = useState(null);

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

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <Container>
        <Row>
          <Col>
            <h3>Welcome back, {user.firstname} 👋</h3>
          </Col>
          <Col className="text-end">
            <Button variant="outline-danger" onClick={handleModalShow}>
              + Add Task
            </Button>
          </Col>
        </Row>

        <Row className="mt-1">
          <Col md={8}>
            <div className="task-section">
              <h5>To-Do</h5>
              <Row>
                {tasks
                  .filter((task) => task.status !== "Completed")
                  .map((task) => (
                    <Col md={6} key={task._id}>
                      <Card className="mb-4 task-card">
                        <Card.Body>
                          <Row>
                            {/* Left Column for Text */}
                            <Col xs={8}>
                              <Card.Title>{task.title}</Card.Title>
                              <Card.Text>
                                {expandedTask === task._id
                                  ? task.description
                                  : `${task.description.substring(0, 100)}...`}
                                {task.description.length > 100 && (
                                  <Button
                                    variant="link"
                                    onClick={() => handleReadMore(task._id)}
                                  >
                                    {expandedTask === task._id
                                      ? "Read Less"
                                      : "Read More"}
                                  </Button>
                                )}
                                <br />
                                Priority:{" "}
                                <span style={{ color: "skyblue" }}>
                                  {task.priority}
                                </span>{" "}
                                | Status:{" "}
                                <span style={{ color: "red" }}>
                                  {task.status}
                                </span>
                              </Card.Text>
                            </Col>

                            {/* Right Column for Image */}
                            <Col xs={4} className="text-center">
                              <Image
                                src={
                                  task.imageURL ||
                                  "https://via.placeholder.com/100"
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

          <Col md={4}>
            <div className="task-section">
              <h5>Task Status</h5>
              <div className="circle-container d-flex justify-content-between">
                <div style={{ width: 80, height: 80 }}>
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

                <div style={{ width: 80, height: 80 }}>
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

                <div style={{ width: 80, height: 80 }}>
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

            <div className="task-section mt-4">
              <h5>Completed Tasks</h5>
              <Row>
                {tasks
                  .filter((task) => task.status === "Completed")
                  .map((task) => (
                    <Col key={task._id}>
                      <Card className="mb-4 task-card">
                        <Card.Body>
                          <Row>
                            <Col xs={8}>
                              <Card.Title>{task.title}</Card.Title>
                              <Card.Text>
                                {task.description.length > 100
                                  ? `${task.description.substring(0, 100)}...`
                                  : task.description}
                                <br />
                                Priority:{" "}
                                <span style={{ color: "skyblue" }}>
                                  {task.priority}
                                </span>{" "}
                                | Status:{" "}
                                <span style={{ color: "red" }}>
                                  {task.status}
                                </span>
                              </Card.Text>
                            </Col>
                            <Col xs={4} className="text-center">
                              <Image
                                src={
                                  task.imageURL ||
                                  "https://via.placeholder.com/100"
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
