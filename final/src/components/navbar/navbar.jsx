// import React from "react";
// import "./navbar.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useLogin } from "../../context/LoginContext";
// import alertIcon from "../../assets/alerts.png";
// import chatIcon from "../../assets/chats.png";
// import storeIcon from "../../assets/store.png";
// import itemsIcon from "../../assets/items.png";
// import logo from "../../assets/GearUp.png";
// import profileDefault from "../../assets/proimage/profile.png"; // Default profile image

// const Navbar = () => {
//   const { isLoggedIn, userInfo, logout } = useLogin(); // Access login status and user info
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // Call logout function
//     navigate("/"); // Redirect to home page
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>

//       <div className="icons">
//         <li>
//           <Link to={!isLoggedIn ? "/login" : "/store"}>
//             <img src={storeIcon} alt="Store Icon" className="icon1" />
//           </Link>
//         </li>
//         <li>
//           <Link to={!isLoggedIn ? "/login" : "/upbooking"}>
//             <img src={itemsIcon} alt="Items Icon" className="icon2" />
//           </Link>
//         </li>
//         <li>
//           <Link to={!isLoggedIn ? "/login" : "/chat"}>
//             <img src={chatIcon} alt="Chat Icon" className="icon3" />
//           </Link>
//         </li>
//         <li>
//           <Link to={!isLoggedIn ? "/login" : "/notify"}>
//             <img src={alertIcon} alt="Alert Icon" className="icon4" />
//           </Link>
//         </li>

//         {/* Profile Section */}
//         <div className="user-section">
//           {isLoggedIn ? (
//             <div className="profile">
//               <Link to="/profile">
//                 <img
//                   src={userInfo?.profileImage || profileDefault}
//                   alt="Profile"
//                   className="profile-icon"
//                 />
//               </Link>
//               <span>Welcome, {userInfo?.name}</span>
//               <button onClick={handleLogout}>Logout</button>
//             </div>
//           ) : (
//             <div className="signup">
//               <Link to="/login">
//                 <button>Sign in</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import alertIcon from "../../assets/alerts.png";
import chatIcon from "../../assets/chats.png";
import storeIcon from "../../assets/store.png";
import itemsIcon from "../../assets/items.png";
import logo from "../../assets/GearUp.png";
import profileDefault from "../../assets/proimage/picme.jpg";

const Navbar = () => {
  const { isLoggedIn, userInfo, logout } = useLogin();
  const navigate = useNavigate();

  // State for profile popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <div className="icons">
        <li>
          <Link to={!isLoggedIn ? "/login" : "/store"}>
            <img src={storeIcon} alt="Store Icon" className="icon1" />
          </Link>
        </li>
        <li>
          <Link to={!isLoggedIn ? "/login" : "/upbooking"}>
            <img src={itemsIcon} alt="Items Icon" className="icon2" />
          </Link>
        </li>
        <li>
          <Link to={!isLoggedIn ? "/login" : "/chat"}>
            <img src={chatIcon} alt="Chat Icon" className="icon3" />
          </Link>
        </li>
        <li>
          <Link to={!isLoggedIn ? "/login" : "/notify"}>
            <img src={alertIcon} alt="Alert Icon" className="icon4" />
          </Link>
        </li>

        {/* Profile Section */}
        <div className="user-section">
  {isLoggedIn ? (
    <div className="profile">
      
      <img
        src={userInfo?.profileImage || profileDefault}
        alt="Profile"
        className="profile-icon"
        onClick={togglePopup}
      />
      {isPopupOpen && (
        <div className="profile-popup">
          <div className="profile-header">
            <img
              src={userInfo?.profileImage || profileDefault}
              alt="Profile"
              className="profile-image"
            />
            
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
                  <a href="/upbooking">View rental history</a>
                </li>
                <li>
                  <a href="/my-rentals">Purchased history</a>
                </li>
              </ul>
            </div>
            <div className="section">
              <h3>Settings</h3>
              <ul>
                <li>
                  <h3 href="/faq">FAQ</h3>
                </li>
                <li>
                  <h3 href="/saved">Saved</h3>
                </li>
              </ul>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  ) : (
    <div className="signup">
      <Link to="/login">
        <button>Sign in</button>
      </Link>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Navbar;

