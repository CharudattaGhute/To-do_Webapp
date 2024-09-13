import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function CreateCategoryForm() {
  const navigate = useNavigate();

  const [categoryname, setcategoryname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated");
      toast.error("User is not authenticated");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/category/addcategory",
        { categoryname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Category added successfully!");
      toast.success("Category added successfully!");
      setcategoryname("");
      setError(null);
    } catch (err) {
      console.error(err.response.data);
      setError("Error adding category. Please try again.");
      toast.error("Error adding category. Please try again.");
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div
      className="container"
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        height: "90%",
      }}
    >
      <Container className="mt-5">
        <Row className="justify-content-between align-items-center">
          <Col>
            <h2>Create Categories</h2>
          </Col>
          <Col className="text-end">
            <Link to={"taskcategories"}>
              <Button variant="link">Go Back</Button>
            </Link>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="categoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryname}
              onChange={(e) => setcategoryname(e.target.value)}
            />
          </Form.Group>

          <div className="mt-3">
            <Button variant="primary" className="me-2" type="submit">
              Create
            </Button>
            <Link to={"taskcategories"}>
              <Button variant="secondary">Cancel</Button>
            </Link>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default CreateCategoryForm;
