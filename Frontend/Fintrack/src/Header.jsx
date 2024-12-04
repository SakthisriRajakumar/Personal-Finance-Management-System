import React, { useContext, useState } from "react";
import logo from "./image/capital-venture.png";
import notify from "./image/bell.png";
import search from "./image/search.png";
import "./Header.css";
import { UserContext } from "./UserContext";
import { NotificationContext } from "./NotificationContext";

const Header = () => {
  const date=new Date();
  const { notification } = useContext(NotificationContext);
  const { username } = useContext(UserContext);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
    console.log(notification);
  const toggleOverlay = () => {
    setOverlayVisible(!isOverlayVisible); 
  };

  return (
    <React.Fragment>
      <div className="header-container">
        <div className="companyname">
          <img src={logo} alt="Company logo" />
          <h1>Fintrack</h1>
        </div>
        <div className="menu-field">
          <div className="inside-container">
            <div className="text">
              <h2>Hi, {username}</h2>
              <h4>{date.toUTCString()}</h4>
            </div>
            <div className="tools">
              <button onClick={toggleOverlay}>
                <img src={notify} alt="notification bar" className={notification ? "has-notification" : ""}/>
              </button>
              <button><img src={search} alt="search icon" /></button>
              <input type="text" name="search" placeholder="Search here or ask me something" />
            </div>
          </div>
        </div>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Notifications</h3>
            <p>{notification || "No new notifications"}</p>
            <button onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
