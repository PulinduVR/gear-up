import React, { useState } from 'react';
import '../notofication/notify.css';

// Example profile pictures
import profile1 from '../../assets/login.png';
import profile2 from '../../assets/signup.png';
import profile3 from '../../assets/upbook1.jpg';

const Notify = () => {
  const [isSilent, setIsSilent] = useState(false);

  const handleSilentClick = () => {
    setIsSilent(!isSilent);
  };

  // Example notifications and chats
  const notifications = [
    { id: 1, message: "You have received a new rental request for Steinway & Sons...", profilePic: profile1 },
    { id: 2, message: '"New Item Added! 🎸 A new instrument is available for rent. Reserve it now!"', profilePic: profile2 },
    { id: 3, message: '"Reservation Confirmed! 🎉 Your reservation has been successfully placed."', profilePic: profile3 },
    { id: 1, message: "You have received a new rental request for Steinway & Sons...", profilePic: profile1 },
    { id: 2, message: '"New Item Added! 🎸 A new instrument is available for rent. Reserve it now!"', profilePic: profile2 },
    { id: 3, message: '"Reservation Confirmed! 🎉 Your reservation has been successfully placed."', profilePic: profile3 }
  ];

  

  return (
    <div className="notifications-page">
      <div className="header">
  <div className="heading-container">
    <h2 className="main-heading">Notifications</h2>
    <p className="notification-count">{notifications.length} notifications</p>
  </div>
  <div className="silent-container">
    <div
      className={`silent-icon ${isSilent ? 'active' : ''}`}
      onClick={handleSilentClick}
    >
      🔕
    </div>
  </div>
</div>


      {/* Notifications Section */}
      <div className="section">
        {notifications.map((notification) => (
          <div className="notification-container" key={notification.id}>
            <img
              src={notification.profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Notify;
