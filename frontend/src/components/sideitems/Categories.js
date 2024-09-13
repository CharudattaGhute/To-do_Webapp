import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../CSS/categories.css"; // Import the component-specific CSS file

const TaskCategories = () => {
  const [taskStatus, setTaskStatus] = useState([
    { id: 1, name: "Completed" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Not Started" },
  ]);

  const [taskPriority, setTaskPriority] = useState([
    { id: 1, name: "Extreme" },
    { id: 2, name: "Moderate" },
    { id: 3, name: "Low" },
  ]);

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with id: ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with id: ${id}`);
  };

  return (
    <div className="task-categories-container">
      <h2>Task Categories</h2>
      <Button variant="success" className="mb-3">
        Add Category
      </Button>

      <div className="mb-5">
        <h4>Task Status</h4>
        <Button variant="link" className="mb-2">
          + Add Task Status
        </Button>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskStatus.map((status, index) => (
              <tr key={status.id}>
                <td>{index + 1}</td>
                <td>{status.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit("status", status.id)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("status", status.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div>
        <h4>Task Priority</h4>
        <Button variant="link" className="mb-2">
          + Add New Priority
        </Button>
        <Table bordered>
          <thead>
            <tr>
              <th>SN</th>
              <th>Task Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskPriority.map((priority, index) => (
              <tr key={priority.id}>
                <td>{index + 1}</td>
                <td>{priority.name}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit("priority", priority.id)}
                    className="me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete("priority", priority.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskCategories;
