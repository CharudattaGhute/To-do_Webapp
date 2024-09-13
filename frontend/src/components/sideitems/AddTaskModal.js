import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

function AddTaskModal({ show, handleClose }) {
  const [title, setTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [priority, setPriority] = useState("Moderate");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("Not started");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const payload = {
      title,
      taskDate, // Matching the name in your state and sending it to the backend
      priority,
      description,
      status, // Adding status to the payload
      image, // Base64 encoded image data (if needed)
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/task/addtask",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Task added successfully!");
      console.log("Response Data:", response.data);

      // Reset form fields
      setTitle("");
      setTaskDate("");
      setPriority("Moderate");
      setDescription("");
      setStatus("Not started");
      setImage(null);
      setError("");
    } catch (err) {
      console.error(
        "Error adding task:",
        err.response ? err.response.data : err.message
      );
      setError("Error adding task. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskDate" className="mt-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskPriority" className="mt-3">
            <Form.Label>Priority</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                name="priority"
                label="Extreme"
                value="Extreme"
                checked={priority === "Extreme"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                name="priority"
                label="Moderate"
                value="Moderate"
                checked={priority === "Moderate"}
                onChange={(e) => setPriority(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                name="priority"
                label="Low"
                value="Low"
                checked={priority === "Low"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="taskDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="taskImage" className="mt-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {/* Status Selection */}
          <Form.Group controlId="taskStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Not started">Not started</option>
              <option value="Inprogress">In progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Add Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTaskModal;
