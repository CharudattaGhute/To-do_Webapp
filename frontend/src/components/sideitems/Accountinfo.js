import React, { useState, useEffect } from "react";
import "../CSS/accountinfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap Modal

const Accountinfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State to toggle forms
  const [showImageUrlModal, setShowImageUrlModal] = useState(false); // State to toggle image URL modal
  const [imageUrl, setImageUrl] = useState(""); // State for storing image URL input
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleBack = () => {
    navigate("/Accountinfo");
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/userinfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("Password Change Data", passwordData);
    // Implement password change API call
  };

  const handleImageClick = () => {
    setShowImageUrlModal(true); // Open modal to input image URL
  };

  const handleImageUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send image URL to the server
      const response = await axios.post(
        "http://localhost:5001/api/user/addimage",
        { image: imageUrl },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser({ ...user, image: response.data.image.image }); // Update user image on success
      setShowImageUrlModal(false); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="account-info-container">
        <div className="go-back" onClick={handleBack}>
          Go Back
        </div>

        <h2>{showPasswordForm ? "Change Password" : "Account Information"}</h2>

        {!showPasswordForm ? (
          <>
            <div className="profile-section">
              <img
                src={
                  user.image
                    ? `http://localhost:5001/${user.image}` // Dynamically use the uploaded image URL
                    : "https://via.placeholder.com/100"
                }
                alt="Profile"
                className="profile-img"
                onClick={handleImageClick} // Open modal to input image URL
              />
              <div>
                <h4>
                  {user.firstname} {user.lastname}
                </h4>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="info-form">
              <form>
                <label>First Name</label>
                <input type="text" placeholder={user.firstname} />

                <label>Last Name</label>
                <input type="text" placeholder={user.lastname} />

                <label>Email Address</label>
                <input type="email" placeholder={user.email} />

                <label>Contact Number</label>
                <input type="text" placeholder="Contact Number" />

                <label>Position</label>
                <input type="text" placeholder="Position" />

                <div className="form-buttons">
                  <button type="submit" className="update-btn">
                    Update Info
                  </button>
                  <button
                    type="button"
                    className="password-btn"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="info-form">
            <form onSubmit={handlePasswordSubmit}>
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
              />

              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
              />

              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
              />

              <div className="form-buttons">
                <button type="submit" className="update-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal for Image URL */}
        <Modal
          show={showImageUrlModal}
          onHide={() => setShowImageUrlModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Image URL</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleImageUrlSubmit}>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="form-control"
              />
              <div className="form-buttons">
                <Button
                  variant="secondary"
                  onClick={() => setShowImageUrlModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Accountinfo;
