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

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <Container fluid className="mt-3">
        <Row>
          {/* Task list on the left */}
          <Col md={4}>
            <ListGroup>
              {tasks.map((task) => (
                <ListGroup.Item
                  key={task._id}
                  action
                  onClick={() => handleTaskClick(task)}
                  className="d-flex align-items-center mb-3"
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    height: "150px", // Adjust height as needed
                  }}
                >
                  <div className="me-2">
                    {/* Task title */}
                    <div className="fw-bold">{task.title}</div>

                    {/* Limit the task description to one line */}
                    <div
                      className="text-truncate"
                      style={{
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {task.description}
                      <p>Priority: {task.priority}</p>
                    </div>
                  </div>

                  {/* Task image */}
                  <img
                    src={task.imageUrl || "https://via.placeholder.com/100"}
                    alt="Task"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginLeft: "auto",
                    }}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Task details on the right */}
          <Col md={8}>
            {selectedTask ? (
              <Card>
                <Card.Img variant="top" src={selectedTask.imageUrl} />
                <Card.Body>
                  <Card.Title>{selectedTask.title}</Card.Title>
                  <Card.Text>{selectedTask.description}</Card.Text>
                  <Badge
                    bg={
                      selectedTask.priority === "Extreme"
                        ? "danger"
                        : "secondary"
                    }
                  >
                    {selectedTask.priority}
                  </Badge>
                  <p className="mt-2">Status: {selectedTask.status}</p>
                  <ul>
                    {selectedTask.actions?.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ) : (
              <p>Select a task to see the details</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Vitaltask;
