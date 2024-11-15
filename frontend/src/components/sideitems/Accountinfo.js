import React, { useState, useEffect } from "react";
import "../CSS/accountinfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Accountinfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleBack = () => {
    navigate("/dashboard/taskDashboard");
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.get(
          "https://to-do-webapp-backend.onrender.com/api/user/userinfo",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);

        const storedImage = localStorage.getItem("profileImage");
        if (storedImage) {
          setImageUrl(storedImage);
        } else if (response.data.user.image) {
          setImageUrl(`https://to-do-webapp-backend.onrender.com${response.data.user.image}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);

  const handleImageClick = () => {
    setShowImageUrlModal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "https://to-do-webapp-backend.onrender.com/api/image/addimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const uploadedImageUrl = response.data.image.image;
      setUser({ ...user, image: uploadedImageUrl });

      const fullImageUrl = `http://localhost:5001${uploadedImageUrl}`;
      setImageUrl(fullImageUrl);
      localStorage.setItem("profileImage", fullImageUrl);

      setShowImageUrlModal(false);
      console.log("Image Uploaded", uploadedImageUrl);
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
                src={imageUrl ? imageUrl : "https://via.placeholder.com/100"}
                alt="Profile"
                className="profile-img"
                onClick={handleImageClick}
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
          <div className="info-form"></div>
        )}

        <Modal
          show={showImageUrlModal}
          onHide={() => setShowImageUrlModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Profile Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleImageSubmit}>
              <input
                type="file"
                onChange={handleFileChange}
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
                  Upload
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
