import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AddTaskModal from "./AddTaskModal";

function TaskDashboard() {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);

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

  return (
    <Container className="mt-5">
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

      <Row className="mt-4">
        <Col md={4}>
          <div className="task-status">
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
        </Col>

        <Col md={8}>
          <h5>To-Do</h5>
          <Row>
            {tasks
              .filter((task) => task.status !== "Completed")
              .map((task) => (
                <Col md={6} key={task._id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>
                        {task.description} <br />
                        Priority:{" "}
                        <span style={{ color: "skyblue" }}>
                          {task.priority}
                        </span>{" "}
                        | Status:{" "}
                        <span style={{ color: "red" }}>{task.status}</span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Created on:{" "}
                        {new Date(task.taskDate).toLocaleDateString()}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>

          <h5 className="mt-4">Completed Task</h5>
          <Row>
            {tasks
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <Col md={6} key={task._id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{task.title}</Card.Title>
                      <Card.Text>
                        {task.description} <br />
                        Priority:{" "}
                        <span style={{ color: "skyblue" }}>
                          {task.priority}
                        </span>{" "}
                        | Status:{" "}
                        <span style={{ color: "red" }}>{task.status}</span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Completed on:{" "}
                        {new Date(task.taskDate).toLocaleDateString()}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <AddTaskModal show={modalShow} handleClose={handleModalClose} />
    </Container>
  );
}

export default TaskDashboard;
