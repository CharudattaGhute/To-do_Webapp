import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get("/api/completed-tasks"); // Replace with your API endpoint
        setCompletedTasks(response.data.completedTasks);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };
    fetchCompletedTasks();
  }, []);

  return (
    <div className="mt-4">
      <h6 className="mb-4">Completed Tasks</h6>
      {completedTasks.map((task) => (
        <Card className="mb-3" key={task.id}>
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <div className="d-flex justify-content-between">
              <span>
                Status: <strong>Completed</strong>
              </span>
              <span>
                Completed on: {new Date(task.completedAt).toLocaleDateString()}
              </span>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default CompletedTasks;
