import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card, Badge } from "react-bootstrap";
import axios from "axios";

function Vitaltask() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch tasks from API with token
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
          setSelectedTask(response.data.tasks[0]); // Set the first task as selected by default
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  // Handler to select a task
  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // Helper functions for styling
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

  return (
    <div
      className="container"
      style={{
        marginTop: "10%",
        border: "2px solid black",
        borderRadius: "8px",
        padding: "20px", // Added padding for better spacing
      }}
    >
      <Container fluid className="mt-3">
        <Row>
          <Col md={4}>
            <h4>Vital Task</h4>
            <ListGroup>
              {tasks.map((task) => (
                <ListGroup.Item
                  key={task._id}
                  action
                  onClick={() => handleTaskClick(task)}
                  className="d-flex align-items-start mb-3 p-3"
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    height: "180px", // Increased height
                    borderRadius: "8px",
                    border: "1px solid #ddd", // Border for better definition
                    backgroundColor: "#f9f9f9", // Slightly different background color
                  }}
                >
                  {/* Task content */}
                  <div className="me-3">
                    {/* Task image */}
                    <img
                      src={
                        task.image
                          ? task.image
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

                  {/* Text content */}
                  <div className="d-flex flex-column justify-content-between">
                    <div>
                      {/* Task title */}
                      <div className="fw-bold mb-1">{task.title}</div>

                      {/* Limit the task description to one line */}
                      <div
                        className="text-truncate mb-1"
                        style={{
                          maxWidth: "200px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
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
              ))}
            </ListGroup>
          </Col>

          {/* Task details on the right */}
          <Col md={8}>
            {selectedTask ? (
              <Card
                style={{
                  border: "1px solid #ddd", // Border for better definition
                  borderRadius: "8px", // Rounded corners
                }}
              >
                <Card.Img
                  variant="top"
                  src={
                    selectedTask.image
                      ? selectedTask.image
                      : "http://localhost:5001/uploads/default-image.jpg"
                  }
                  style={{
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
                <Card.Body>
                  <Card.Title>{selectedTask.title}</Card.Title>
                  <Card.Text>{selectedTask.description}</Card.Text>
                  <p>
                    Priority:{" "}
                    <Badge
                      bg={getPriorityColor(selectedTask.priority)}
                      style={{ marginRight: "5px" }}
                    >
                      {selectedTask.priority}
                    </Badge>
                  </p>
                  <p>
                    Status:{" "}
                    <Badge
                      bg={getStatusColor(selectedTask.status)}
                      style={{ marginRight: "5px" }}
                    >
                      {selectedTask.status}
                    </Badge>
                  </p>
                  <ul className="mt-3">
                    {selectedTask.actions?.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer
                  className="text-muted"
                  style={{ borderTop: "1px solid #ddd" }}
                >
                  Created on:{" "}
                  {new Date(selectedTask.taskDate).toLocaleDateString()}
                </Card.Footer>
              </Card>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Vitaltask;
