import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonateFood.css";

const DonateFood = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    quantity: "",
    expiry: "",
    location: {
      city: "",
      address: "",
      pincode: ""
    },
    donor: "",
    description: ""
  });

  // IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // NORMAL INPUTS
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // LOCATION INPUTS
  const handleLocationChange = (e) => {
    setForm({
      ...form,
      location: {
        ...form.location,
        [e.target.name]: e.target.value
      }
    });
  };

  // 🔥 SUBMIT (UPDATED)
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 🔥 GET LOGGED-IN USER
    const user = JSON.parse(localStorage.getItem("user"));

    // 🔥 ADD DONOR ID (IMPORTANT)
    formData.append("donorId", user.id);

    // FORM DATA
    formData.append("title", form.title);
    formData.append("quantity", form.quantity);
    formData.append("expiry", form.expiry);
    formData.append("donor", form.donor);
    formData.append("description", form.description);

    // LOCATION
    formData.append("location", JSON.stringify(form.location));

    // IMAGE
    if (image) {
      formData.append("image", image);
    }

    fetch("http://localhost:5000/api/food/add", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(() => {
        alert("Food posted!");
        navigate("/find-food");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="donate-container">
      <div className="donate-card">

        <h2>Donate Food</h2>
        <p className="form-subtitle">Share surplus food with those who need it most</p>

        <form onSubmit={handleSubmit}>

          {/* ── IMAGE ── */}
          <div className="image-upload">
            <label className="image-upload-label" htmlFor="food-image-input">
              {preview ? null : (
                <>
                  <span className="upload-icon">📸</span>
                  <span className="upload-text">Upload Food Image</span>
                  <span className="upload-hint">Click to browse • JPG, PNG supported</span>
                </>
              )}
              <input
                id="food-image-input"
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </label>
            {preview && (
              <img src={preview} alt="preview" className="preview-img" />
            )}
          </div>

          {/* ── FOOD INFO ── */}
          <div className="form-section-label">Food Details</div>

          <div className="form-row">
            <div className="input-wrapper">
              <input
                type="text"
                name="title"
                placeholder="Food Name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <label style={{color:"rgba(107, 114, 128, 0.6)",fontSize:"15px"}}>Expiry date</label>
            <input
              type="datetime-local"
              placeholder="Expiry date"
              name="expiry"
              onChange={handleChange}
              required
            />
          </div>

          {/* ── LOCATION ── */}
          <div className="form-section-label">Pickup Location</div>

          <div className="form-row">
            <div className="input-wrapper">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleLocationChange}
                required
              />
            </div>

            <div className="input-wrapper">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleLocationChange}
              />
            </div>
          </div>

          <div className="input-wrapper">
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              onChange={handleLocationChange}
            />
          </div>

          {/* ── CONTACT & NOTES ── */}
          <div className="form-section-label">Contact & Notes</div>

          <div className="input-wrapper">
            <input
              type="text"
              name="donor"
              placeholder="Contact / Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-wrapper textarea-wrapper">
            <textarea
              name="description"
              placeholder="Additional Notes (allergies, packaging, etc.)"
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="submit-btn" type="submit">
            Post Food
          </button>

        </form>
      </div>
    </div>
  );
};

export default DonateFood;
