import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import axios from "axios";
import "../CSS/TaskDeatails.css";

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTaskDetails() {
      try {
        const response = await axios.get(
          `https://to-do-webapp-backend.onrender.com/api/task/getTaskById/${taskId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTask(response.data.task);
      } catch (error) {
        console.log("Error fetching task details:", error);
      }
    }

    fetchTaskDetails();
  }, [taskId]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="conatiner" style={{ marginTop: "10%" }}>
      <Container className="task-details-container mt-5">
        <Card className="p-4 task-details-card">
          <Row>
            <Col md={2}>
              <Image
                src={
                  task.image ||
                  "https://to-do-webapp-backend.onrender.com/uploads/default-image.jpg"
                }
                className="task-image"
              />
            </Col>
            <Col md={8}>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-meta">
                <strong>Priority:</strong>{" "}
                <span className={`priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <br />
                <strong>Status:</strong>{" "}
                <span className={`status-${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
                <br />
                <small className="text-muted">
                  Created on: {new Date(task.taskDate).toLocaleDateString()}
                </small>
              </p>
            </Col>
            <Col md={2} className="text-end">
              <Button
                variant="link"
                className="go-back-btn"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <p>{task.description}</p>
            </Col>
          </Row>
          <Row className="justify-content-end mt-4">
            <Col md={1} className="text-end">
              <i className="fas fa-edit edit-icon"></i>
            </Col>
            <Col md={1} className="text-end">
              <i className="fas fa-trash-alt delete-icon"></i>
            </Col>
            <Col md={1} className="text-end">
              <i className="fas fa-exclamation-triangle alert-icon"></i>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default TaskDetails;
