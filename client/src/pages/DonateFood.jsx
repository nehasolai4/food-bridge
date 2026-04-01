import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonateFood.css";

const DonateFood = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ✅ FORM STATE
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

  // ✅ HANDLE IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ HANDLE INPUT CHANGE (for normal fields)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLE LOCATION CHANGE (IMPORTANT)
  const handleLocationChange = (e) => {
    setForm({
      ...form,
      location: {
        ...form.location,
        [e.target.name]: e.target.value
      }
    });
  };

  // ✅ SUBMIT TO BACKEND
  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("quantity", form.quantity);
  formData.append("expiry", form.expiry);
  formData.append("donor", form.donor);
  formData.append("description", form.description);

  // location (stringify object)
  formData.append("location", JSON.stringify(form.location));

  // image
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
    });
};

  return (
    <div className="donate-container">

      <div className="donate-card">
        <h2>Donate Food</h2>

        <form onSubmit={handleSubmit}>

          {/* IMAGE */}
          <div className="image-upload">
            <label>Upload Food Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {preview && (
              <img src={preview} alt="preview" className="preview-img" />
            )}
          </div>

          {/* FOOD NAME */}
          <input
            type="text"
            name="title"
            placeholder="Food Name"
            onChange={handleChange}
            required
          />

          {/* QUANTITY */}
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            required
          />

          {/* EXPIRY */}
          <label style={{ color: "grey", fontSize: "14px" }}>
            Expiry date
          </label>
          <input
            type="datetime-local"
            name="expiry"
            onChange={handleChange}
            required
          />

          {/* 🔥 LOCATION (FIXED PROPERLY) */}

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleLocationChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleLocationChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleLocationChange}
          />

          {/* DONOR */}
          <input
            type="text"
            name="donor"
            placeholder="Contact / Name"
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Additional Notes"
            onChange={handleChange}
          ></textarea>

          <button className="submit-btn" type="submit">
            Post Food
          </button>

        </form>
      </div>

    </div>
  );
};

export default DonateFood;