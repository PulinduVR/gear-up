import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import "../add-item/add.css";
import Upload from "../Upload";

const categoryOptions = {
  "Musical Instruments": [
    "Guitars",
    "Keyboards & Piano",
    "Drums & Percussion",
    "String Instruments",
    "Brass Instruments",
    "Windwood Instruments",
    "DJ Equipment",
  ],
  "Audio & Recording": [
    "Microphones",
    "Headphones",
    "Auio Interfaces",
    "Mixing Consoles",
    "Portable Recorder",
    "Monitor Speakers",
    "DJ Boxes",
  ],
  "PA & Live Sound": [
    "Mixers",
    "PA system",
    "Powered Speakers",
    "Subwoofers",
    "Amplifiers",
    "In-Ear Monitor",
  ],
  "Lighting & Stage": [
    "Stage Lights",
    "Fog Machines",
    "Lasers & Special Effects",
    "Lighting Controller",
    "Trussing & Rigging Eq",
    "Stage Platforms",
  ],
  "Studio Equipments": [
    "Studio Monitors",
    "Audio Monitor",
    "Studio Furniture",
    "Preamps & Channel Strips",
    "Acoustic Treatment Panel",
    "MIDL Controller",
  ],
  "Guitar & Base Access": [
    "Guitar Pedals",
    "Amplifiers",
    "PedalBoards",
    "Guitar/Bass Stand",
    "Cables",
  ],
  "Percussion Accessories": [
    "Drumsticks & Mallets",
    "Drum Thrones",
    "Practice Pads",
    "Drum Head",
    "Drum Pedals",
  ],
  "DJ & Performance": [
    "DJ COntrollers",
    "SLipmats",
    "Vinyl Records",
    "DJ Headphones",
    "Lighting Effects",
  ],
  "Cables & Connectors": [
    "XLR Cables",
    "Instrument Cables",
    "Patch Cables",
    "Speaker Cables",
    "Power Cables & Extension",
    "Cable Management Access",
  ],
  "Sheet Music & Stands": ["Music Stands", "Sheet Music", "Stand Light"],
  "Cases & Transport": [
    "Instrument Cases",
    "Hard Cases & Flight Cases",
    "Gig Bags",
    "Trolleys & Carts",
  ],
  "Batteries & Others": [
    "Batteries & Adapters",
    "Tuning Devices",
    "Cleaning & Maintenance Kits",
    "Music Software",
  ],
};

function AddItem() {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    district: "",
    city: "",
    postalCode: "",
    category: "",
    subCategory: "",
    description: "",
    img: image.url || "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (image?.url) {
      setFormData((prevData) => ({
        ...prevData,
        img: image.url,
      }));
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      console.log(formData);
      const response = await fetch("http://localhost:5000/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          user: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add item");
      }

      alert("Item added successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="add-item-container">
      <h1 className="add-h1">Add items</h1>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-left">
          <div className="form-group">
            <label>
              Item name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter item name"
            />
          </div>

          <div className="form-group">
            <label>Add prices (Rs)</label>
            <div className="price-options">
              <div>
                <input type="radio" id="daily" name="price-type" />
                <label htmlFor="daily">Daily Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Rs."
                />
              </div>
              {/* <div>
                <input type="radio" id="weekly" name="price-type" />
                <label htmlFor="weekly">weekly</label>
                <input type="text" placeholder="Rs." />
              </div>
              <div>
                <input type="radio" id="monthly" name="price-type" />
                <label htmlFor="monthly">monthly</label>
                <input type="text" placeholder="Rs." />
              </div> */}
            </div>
          </div>

          <div className="form-group">
            <label>
              Location <span>*</span>
            </label>
            <div className="location-inputs">
              {/* <select>
                <option>District</option>
              </select> */}
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
              />
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              Add images <span>*</span>
            </label>
            <div className="add-images">
              <Upload type="image" setData={setImg}>
                +
              </Upload>
            </div>
            {/* <button onClick={ref.current.Click()} type="button">
                +
              </button> */}
          </div>
        </div>

        <div className="form-right">
          <div className="form-group-horizontal">
            <label>
              Category <span>*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {Object.keys(categoryOptions).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label>Sub category</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              disabled={!formData.category} // Disable if no category is selected
            >
              <option value="">Select Subcategory</option>
              {formData.category &&
                categoryOptions[formData.category].map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Description <span>*</span>
            </label>
            <textarea
              name="description"
              placeholder="Enter items informations"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="apply-btn" disabled={loading}>
              {loading ? "Submitting..." : "Apply"}
            </button>
            <button type="button" className="discard-btn">
              Discard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
