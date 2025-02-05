import React from "react";
import "./profile.css";
import profileImage from "../../assets/proimage/picme.jpg";

const Profile = () => {
  const handleLogout = () => {
    // Logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h2 className="profile-name">Sarah Vinsoff</h2>
        <a href="/edit-profile" className="edit-profile-link">
          Edit Profile
        </a>
      </div>

      <div className="profile-sections">
        <div className="section">
          <h3>Account</h3>
          <ul>
            <li>
              <a href="/add-item">Add new item</a>
            </li>
            <li>
              <a href="/boost-ads">Boost ads</a>
            </li>
            <li>
              <a href="/rental-history">View rental history</a>
            </li>
            <li>
              <a href="/purchase-history">Purchased history</a>
            </li>
          </ul>
        </div>

        <div className="section">
          <h3>Settings</h3>
          <ul>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/saved">Saved</a>
            </li>
          </ul>
          <button  className="logout-btn"   onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
