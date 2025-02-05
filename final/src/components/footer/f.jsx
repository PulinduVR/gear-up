import React from 'react';
import './f.css';

import x_icon from '../../assets/X.png';
import insta_icon from '../../assets/Instagram.png';
import youtube_icon from '../../assets/YouTube.png';
import linkedin_icon from '../../assets/LinkedIn.png';
import logo from '../../assets/GearUp.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-column0">
        <img src={logo} alt="Logo" className="logo" />
        <div className="contact">
          <p className="contact-number">(+94) 112626555</p>
          <p className="contact-number">(+94) 779090512</p>
          <p className="contact-number">(+94) 773343347</p>
        </div>
        <div className="social">
          <a href="#"><img src={x_icon} alt="Twitter" className="social-icon" /></a>
          <a href="#"><img src={insta_icon} alt="Instagram" className="social-icon" /></a>
          <a href="#"><img src={youtube_icon} alt="YouTube" className="social-icon" /></a>
          <a href="#"><img src={linkedin_icon} alt="LinkedIn" className="social-icon" /></a>
        </div>
      </div>
      <div className="footer-column1 footer-links">
        <h3>Pages</h3>
        <ul>
        <li className="pages">Home</li>
          <li className="pages">Our story</li>
          <li className="pages">Partners</li>
          <li className="pages">
            <Link to="/faq" className="link">FAQ</Link>
            </li>
          <li className="pages">
            <Link to="/saved" className="link">Saved</Link>
          </li>
          <li className="pages">Services</li>
        </ul>
      </div>
      <div className="footer-column2 footer-links">
        <h3>Accounts</h3>
        <ul>
        <li className="pages">Profile</li>
          <li className="pages">Chats</li>
          <li className="pages">Your items</li>
          <li className="pages">Boost Ads</li>
          <li className="pages">History</li>
        </ul>
      </div>
      <div className="footer-column3 footer-links">
        <h3>Guides</h3>
        <ul>
        <li className="pages">
          <Link to="/policy">Rental policy</Link>
          </li>
          <li className="pages">
          <Link to="/cancellation">Cancellation</Link>
          </li>
          <li className="pages">
          <Link to="/terms">Terms & Con</Link>
          </li>
          <li className="pages">Privacy</li>
        </ul>
      </div>
      <div className="footer-column3 footer-links">
        <h3>Categories</h3>
        <ul>
        <li className="pages">Music instruments</li>
          <li className="pages">Audio & recordings</li>
          <li className="pages">PA & live sounds</li>
          <li className="pages">Lighting & stage</li>
          <li className="pages">Studio equipment</li>
          <li className="pages">Guitar & Bass accessories</li>
          <li className="pages">Percussion accessories</li>
        </ul>
      </div>
      <div className="footer-column3 footer-links">
        <ul>
        <li className="pages">Music instruments</li>
        <li className="pages">DJ & performance</li>
          <li className="pages">Cables & connections</li>
          <li className="pages">Sheet music & stands</li>
          <li className="pages">Event & venue</li>
          <li className="pages">Cases & transport</li>
          <li className="pages">Batteries & others</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
