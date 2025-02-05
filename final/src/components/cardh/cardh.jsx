import React, { useState, useEffect } from "react";
import "./cardh.css";

import pianoimge from "../../assets/proimage/piono.jpg";
import drumsimage from "../../assets/proimage/drmus.jpg";
import violin from "../../assets/proimage/violin.png";
import shareicon from "../../assets/proimage/share.png";
import locationicon from "../../assets/proimage/icon.png";
import dj from "../../assets/proimage/dj.jpg";
import saxo from "../../assets/proimage/saxo.jpg";
import canjo from "../../assets/proimage/canjo.jpg";
import amped from "../../assets/proimage/amped.jpg";
import fander from "../../assets/proimage/fander.jpg";
import pad from "../../assets/proimage/pad.jpg";
import Amplifier from "../../assets/proimage/Amplifier.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";

const Cardh = () => {
  // Card data array
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products/");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [dropdownVisibility, setDropdownVisibility] = useState({});

  const toggleDropdown = (category) => {
    setDropdownVisibility((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
    setActiveDropdown((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const cardsPerPage = 5; // Number of cards per page

  // Get current cards to display based on page number
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container">
        {/* Filter card on the left side */}
        <div className="filter-card">
          <h2>Filters</h2>
          <div className="filter-options">
            <label>
              <input type="checkbox" /> All
            </label>
            <label>
              <input type="checkbox" /> Available only
            </label>
            <label>
              <input type="checkbox" /> Acoustic
            </label>
            <label>
              <input type="checkbox" /> Electric
            </label>
            <label>
              <input type="checkbox" /> Price (Low-High)
            </label>
            <label>
              <input type="checkbox" /> Price (High-Low)
            </label>
          </div>
          <h2>Categories</h2>
          <ul className="categories">
            <li
              onClick={() => toggleDropdown("musical")}
              className={`dropdown-item ${
                activeDropdown === "musical" ? "active" : ""
              }`}
            >
              Musical Instruments <FaChevronDown className="down-arrow" />
              {dropdownVisibility["musical"] && (
                <ul className="subcategory-list">
                  <li>Guitars</li>
                  <li>Keyboards & Piano</li>
                  <li>Drums & Percussion</li>
                  <li>String Instruments</li>
                  <li>Brass Instruments</li>
                  <li>Windwood Instruments</li>
                  <li>DJ Equipment</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("audio")}
              className={`dropdown-item ${
                activeDropdown === "audio" ? "active" : ""
              }`}
            >
              Audio & Recording <FaChevronDown className="down-arrow" />
              {dropdownVisibility["audio"] && (
                <ul className="subcategory-list">
                  <li>Microphone</li>
                  <li>Audio Interfaces</li>
                  <li>Mixing Consoles</li>
                  <li>Portable Recorder</li>
                  <li>Monitor Speakers</li>
                  <li>Headphones</li>
                  <li>DJ Boxes</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("live")}
              className={`dropdown-item ${
                activeDropdown === "live" ? "active" : ""
              }`}
            >
              PA & Live Sound <FaChevronDown className="down-arrow" />
              {dropdownVisibility["live"] && (
                <ul className="subcategory-list">
                  <li>PA system</li>
                  <li>Powered speackers</li>
                  <li>Subwoofers</li>
                  <li>Amplifiers</li>
                  <li>In-Ear monitor</li>
                  <li>Mixers</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("light")}
              className={`dropdown-item ${
                activeDropdown === "light" ? "active" : ""
              }`}
            >
              Lighting & Stage <FaChevronDown className="down-arrow" />
              {dropdownVisibility["light"] && (
                <ul className="subcategory-list">
                  <li>Stage light</li>
                  <li>Fog machines</li>
                  <li>Lasers & Special effects</li>
                  <li>Lighting controller</li>
                  <li>Trussing & Rigging eq</li>
                  <li>Stage platforms</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("st")}
              className={`dropdown-item ${
                activeDropdown === "st" ? "active" : ""
              }`}
            >
              Studio Equipments <FaChevronDown className="down-arrow" />
              {dropdownVisibility["st"] && (
                <ul className="subcategory-list">
                  <li>Audio monitor</li>
                  <li>Studio furniture</li>
                  <li>Preamps &channel strips</li>
                  <li>Acoustic treatment panel</li>
                  <li>Studio monitor</li>
                  <li>MIDL controller</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("gtr")}
              className={`dropdown-item ${
                activeDropdown === "gtr" ? "active" : ""
              }`}
            >
              Guitar & Bass Access. <FaChevronDown className="down-arrow" />
              {dropdownVisibility["gtr"] && (
                <ul className="subcategory-list">
                  <li>Guitar pedals</li>
                  <li>Amplifiers</li>
                  <li>PedalBoards</li>
                  <li>Guitar/bass stand</li>
                  <li>Cables</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("pa")}
              className={`dropdown-item ${
                activeDropdown === "pa" ? "active" : ""
              }`}
            >
              Percussion Accessories <FaChevronDown className="down-arrow" />
              {dropdownVisibility["pa"] && (
                <ul className="subcategory-list">
                  <li>Drumsticks & mallets</li>
                  <li>Drum thrones</li>
                  <li>Practice pads</li>
                  <li>Drum head</li>
                  <li>Drum pedals</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("DJ")}
              className={`dropdown-item ${
                activeDropdown === "DJ" ? "active" : ""
              }`}
            >
              DJ & Performance <FaChevronDown className="down-arrow" />
              {dropdownVisibility["DJ"] && (
                <ul className="subcategory-list">
                  <li>DJ controllers</li>
                  <li>Slipmats</li>
                  <li>Vinyl records</li>
                  <li>DJ headphones</li>
                  <li>Lighting effects</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("Cables")}
              className={`dropdown-item ${
                activeDropdown === "Cables" ? "active" : ""
              }`}
            >
              Cables & Connectors <FaChevronDown className="down-arrow" />
              {dropdownVisibility["Cables"] && (
                <ul className="subcategory-list">
                  <li>Instruments cabels</li>
                  <li>XLR cables</li>
                  <li>patch cables</li>
                  <li>Speaker cabels</li>
                  <li>Power cabels & extension</li>
                  <li>Cable management access</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("Sheet")}
              className={`dropdown-item ${
                activeDropdown === "Sheet" ? "active" : ""
              }`}
            >
              Sheet Music & Stands <FaChevronDown className="down-arrow" />
              {dropdownVisibility["Sheet"] && (
                <ul className="subcategory-list">
                  <li>Sheet music</li>
                  <li>Music stand</li>
                  <li>stand light</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("Cases")}
              className={`dropdown-item ${
                activeDropdown === "Cases" ? "active" : ""
              }`}
            >
              Cases & Transport <FaChevronDown className="down-arrow" />
              {dropdownVisibility["Cases"] && (
                <ul className="subcategory-list">
                  <li>Instrument cases</li>
                  <li>Hard cases & flight cases</li>
                  <li>Pedalboad casses</li>
                  <li>Gig bags</li>
                  <li>Trolleys & carts</li>
                </ul>
              )}
            </li>

            <li
              onClick={() => toggleDropdown("Batteries")}
              className={`dropdown-item ${
                activeDropdown === "Batteries" ? "active" : ""
              }`}
            >
              Batteries & Others <FaChevronDown className="down-arrow" />
              {dropdownVisibility["Batteries"] && (
                <ul className="subcategory-list">
                  <li>Batteries & adapters</li>
                  <li>Tuning devices</li>
                  <li>Cleaning & maintenance kits</li>
                  <li>Music software</li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Cards container */}
        <div className="fullcont">
          {currentCards.map((card, index) => (
            <Card
              key={index}
              image={card.img}
              title={card.name}
              category={card.category}
              location={card.district}
              dailyPrice={card.price}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate(1)}>1</button>
        <button onClick={() => paginate(2)}>2</button>
      </div>
    </div>
  );
};

// Card Component to handle individual heart state
const Card = ({ image, title, category, location, dailyPrice }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="card">
      <div className="pianoimg">
        <img src={image} alt={title} className="pianoimge" />
      </div>
      <div className="cont2">
        {/* Section 1: Category and Icons */}
        <div className="section1">
          <p>{category}</p>
          <div className="heart-share-icons">
            <img src={shareicon} alt="Share" className="shareicon" />
            <svg
              onClick={toggleLike}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hearticon"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={liked ? "red" : "none"}
              />
            </svg>
          </div>
        </div>

        {/* Section 2: Title and Location */}
        <div className="section2">
          <Link
            to={`/description/${encodeURIComponent(title)}`}
            className="title-link"
          >
            <h1>{title}</h1>
          </Link>
          <div className="locationset">
            <div className="sec1">
              <img src={locationicon} alt="Location" className="locationicon" />
              <p>{location}</p>
            </div>
            <div className="sec2">
              <p>(show on map)</p>
            </div>
          </div>
        </div>

        {/* Section 3: Prices and Calendar */}
        <div className="section3">
          <div className="priceset">
            <div className="p1">
              <p>Daily</p>
              <h3>{dailyPrice}</h3>
            </div>
            {/* <div className="p2">
              <p>Weekly</p>
              <h3>{weeklyPrice}</h3>
            </div>
            <div className="p3">
              <p>Monthly</p>
              <h3>{monthlyPrice}</h3>
            </div> */}
          </div>
          <div className="button">
            {/* Toggle Calendar */}
            <div className="btnn" style={{ position: "relative" }}>
              <button className="sabutton" onClick={toggleCalendar}>
                See availability
              </button>

              {/* Calendar Popup */}
              {isCalendarVisible && (
                <div className="calendar-popup">
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardh;
