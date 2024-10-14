import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Badge,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../CSS/vital.css";

function Vitaltask() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/task/getFilteredTasks", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        if (response.data.tasks.length > 0) {
          setSelectedTask(response.data.tasks[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks", error);
      });
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "danger";
      case "In Progress":
        return "primary";
      default:
        return "secondary";
    }
  };

  const getPriorityColor = (priority) => {
    return priority === "Extreme" ? "danger" : "info";
  };

  const handleShowModal = () => {
    setUpdatedTitle(selectedTask.title);
    setUpdatedDescription(selectedTask.description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateTask = () => {
    axios
      .put(
        `http://localhost:5001/api/task/updateTask/${selectedTask._id}`,
        {
          title: updatedTitle,
          description: updatedDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setTasks(
          tasks.map((task) =>
            task._id === selectedTask._id ? response.data.task : task
          )
        );
        setSelectedTask(response.data.task);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating task", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios
      .delete(`http://localhost:5001/api/task/deleteTask/${taskId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
        setSelectedTask(null);
      })
      .catch((error) => {
        console.error("Error deleting task", error);
      });
  };

  return (
    <div
      className="container"
      style={{
        marginTop: "10%",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <h4>Vital Task</h4>
            <ListGroup>
              {tasks.map((task) =>
                task ? (
                  <ListGroup.Item
                    key={task._id}
                    action
                    onClick={() => handleTaskClick(task)}
                    className="d-flex align-items-start mb-3 p-3"
                    style={{
                      cursor: "pointer",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      height: "180px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div className="me-3">
                      <img
                        src={
                          task.image
                            ? `http://localhost:5001/uploads/${task.image}`
                            : "http://localhost:5001/uploads/default-image.jpg"
                        }
                        alt="Task"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="d-flex flex-column justify-content-between">
                      <div>
                        <div className="fw-bold mb-1">{task.title}</div>
                        <div
                          className="text-truncate mb-1"
                          style={{ maxWidth: "200px" }}
                        >
                          {task.description}
                        </div>
                        <div className="mb-2">
                          <p className="mb-0">
                            Priority:{" "}
                            <Badge bg={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                          </p>
                          <p className="mb-0">
                            Status:{" "}
                            <Badge bg={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </p>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ) : null
              )}
            </ListGroup>
          </Col>

          <Col md={8}>
            {selectedTask && (
              <Card
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: "0 0 150px", marginRight: "20px" }}>
                      <Card.Img
                        src={
                          selectedTask.image
                            ? `http://localhost:5001/uploads/${selectedTask.image}`
                            : "http://localhost:5001/uploads/default-image.jpg"
                        }
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div style={{ flex: "1" }}>
                      <Card.Title>{selectedTask.title}</Card.Title>

                      <p>
                        Priority:{" "}
                        <Badge bg={getPriorityColor(selectedTask.priority)}>
                          {selectedTask.priority}
                        </Badge>
                      </p>
                      <p>
                        Status:{" "}
                        <Badge bg={getStatusColor(selectedTask.status)}>
                          {selectedTask.status}
                        </Badge>
                      </p>

                      <Card.Text>{selectedTask.description}</Card.Text>

                      <div className="additional-info">
                        <h5>Additional Information</h5>
                        <p>Additional content or features can go here.</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Button
                    variant="link"
                    onClick={handleShowModal}
                    style={{ fontSize: "20px", color: "#007bff" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDeleteTask(selectedTask._id)}
                    style={{ fontSize: "20px", color: "#dc3545" }}
                  >
                    <FaTrash />
                  </Button>
                </div>
                <Card.Footer
                  className="text-muted"
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  Created on:{" "}
                  {selectedTask.taskDate
                    ? new Date(selectedTask.taskDate).toLocaleDateString()
                    : "N/A"}
                </Card.Footer>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Vitaltask;
