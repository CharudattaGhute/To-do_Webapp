import React, { useState } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Modal,
  Navbar as BSNavbar,
  Nav,
  Row,
} from "react-bootstrap";
import { FaSearch, FaBell, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Navbar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCalendarClick = () => setShowCalendar(true);
  const handleCloseCalendar = () => setShowCalendar(false);

  const getCurrentDateString = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <BSNavbar expand="md" className="mt-4" style={{ maxWidth: "100%" }}>
        <Container fluid>
          <BSNavbar.Brand href="#" className="text-center text-md-left">
            <h2 style={{ fontSize: "36px" }}>
              <span style={{ color: "#F46B6B" }}>Dash</span>board
            </h2>
          </BSNavbar.Brand>

          <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BSNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100">
              <Col xs="12" md="6" className="mt-3 mt-md-0">
                <Form className="d-flex justify-content-center justify-content-md-start">
                  <Form.Control
                    type="search"
                    placeholder="Search your task here..."
                    className="me-2"
                    style={{
                      borderRadius: "30px",
                      backgroundColor: "#F9FAFD",
                      paddingLeft: "20px",
                      border: "none",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Button
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#F46B6B",
                      border: "none",
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <FaSearch />
                  </Button>
                </Form>
              </Col>

              <Col
                xs="auto"
                className="d-flex align-items-center justify-content-end gap-3 ms-auto"
                style={{ marginLeft: "auto" }}
              >
                <Button
                  className="p-2"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#F46B6B",
                    border: "none",
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <FaBell size={20} color="white" />
                </Button>

                <Button
                  className="p-2"
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#F46B6B",
                    border: "none",
                    width: "45px",
                    height: "45px",
                  }}
                  onClick={handleCalendarClick}
                >
                  <FaCalendarAlt size={20} color="white" />
                </Button>

                <div>
                  <div
                    style={{
                      color: "black",
                      fontSize: "18px",
                      textAlign: "right",
                    }}
                  >
                    {getCurrentDateString().split(",")[0]}
                  </div>
                  <div
                    style={{
                      color: "#1890FF",
                      fontSize: "16px",
                      textAlign: "right",
                    }}
                  >
                    {getCurrentDateString().split(",")[1]}
                  </div>
                </div>
              </Col>
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>

      <Modal show={showCalendar} onHide={handleCloseCalendar}>
        <Modal.Header closeButton>
          <Modal.Title>Select Date</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
