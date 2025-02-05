import React, { useState } from 'react';
import '../update-item/update.css';

function UpdateItem() {
    const [isOn, setIsOn] = useState(false);
  const [images, setImages] = useState([
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
  ]);

  
    // Function to toggle the state
    const handleToggle = () => {
      setIsOn(!isOn);
    };
  

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  const handleAddImage = () => {
    if (images.length >= 3) {
      alert("You can only upload up to 3 images.");
      return;
    }
    // Add a placeholder for a new image. Replace this with an actual file upload handler.
    setImages([...images, `image${images.length + 1}.jpg`]);
  };

  return (
    <div className="update-item-container">
      <h1 className="update-h1">Edit item details</h1>
      <div className="toggle-container-update">
      <label className='textHidden'>Temporarily hidden </label>
  <label className="toggle-switch">
    <input
      type="checkbox"
      checked={isOn}
      onChange={handleToggle}
    />
    <span className="slider"> </span>
  </label>
  

  <button className="boost-btn">Boost Ad</button>
</div>




      <form className="update-item-form">
        <div className="form-left">
          <div className="form-group">
            <label>Item name <span>*</span></label>
            <input type="text" placeholder="Enter item name" />
          </div>

          <div className="form-group">
            <label>Add prices (Rs)</label>
            <div className="price-options">
              <div>
                <input type="radio" id="daily" name="price-type" />
                <label htmlFor="daily">daily</label>
                <input type="text" placeholder="Rs." />
              </div>
              <div>
                <input type="radio" id="weekly" name="price-type" />
                <label htmlFor="weekly">weekly</label>
                <input type="text" placeholder="Rs." />
              </div>
              <div>
                <input type="radio" id="monthly" name="price-type" />
                <label htmlFor="monthly">monthly</label>
                <input type="text" placeholder="Rs." />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Location <span>*</span></label>
            <div className="location-inputs">
              <select>
                <option>District</option>
              </select>
              <input type="text" placeholder="City" />
              <input type="text" placeholder="Postal code" />
            </div>
          </div>

          <div className="form-group">
            <label>Add images <span>*</span></label>
            <div className="update-images">
              {images.map((image, index) => (
                <div className="image-container" key={index}>
                  <img src={image} alt={`Uploaded ${index}`} />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-image-btn"
                onClick={handleAddImage}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="form-right">
          <div className="form-group-horizontal">
            <label>Category <span>*</span></label>
            <select>
              <option>Category</option>
            </select>

            <label>Sub category <span>*</span></label>
            <select>
              <option>Sub category</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description <span>*</span></label>
            <textarea placeholder="Enter items information"></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="apply-btn-1">Apply</button>
            <button type="button" className="hide-btn-1">Temporarily Hide</button>
            <button type="button" className="delete-btn-1">Delete</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateItem;
