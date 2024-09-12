import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks"); // Replace with your API endpoint
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h6 className="mb-4">To-Do List</h6>
      {tasks.map((task) => (
        <Card className="mb-3" key={task.id}>
          <Card.Body>
            <Card.Title>
              {task.title}
              <Badge
                pill
                bg={task.priority === "High" ? "danger" : "warning"}
                className="ms-2"
              >
                {task.priority}
              </Badge>
            </Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <div className="d-flex justify-content-between">
              <span>
                Status: <strong>{task.status}</strong>
              </span>
              <span>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
