import React, { useEffect, useState } from "react";
import "./FindFood.css";

const FindFood = () => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/food")
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.log(err));
  }, []);


  const getTimeLeft = (expiry) => {
  const now = new Date();
  const exp = new Date(expiry);
  const diff = exp - now;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day(s) left`;
  if (hours > 0) return `${hours} hour(s) left`;
  return "Expiring soon";
};

const handleRequest = (id) => {
  // later you can call backend here
  window.location.href = "/request-sent";
};
const [selectedFood, setSelectedFood] = useState(null);
  return (
    <div className="food-page">

      <h1 className="heading">🍱 Available Food</h1>

      {/* SEARCH */}
      <div className="search-bar">
        <input type="text" placeholder="Search by city or food..." />
      </div>

      {/* GRID */}
      <div className="food-grid">

        {food.map((item) => (
          <div className="food-card" key={item._id}>

            {/* 🔥 CIRCLE IMAGE */}
            <div className="circle-img">
              <img
                src={
                  item.image
                    ? `http://localhost:5000/uploads/${item.image}`
                    : "/placeholder.png"
                }
                alt="food"
              />
            </div>

            <h3>{item.title}</h3>

            <p className="desc">{item.location?.city}</p>
            <p className="qty">{item.quantity}</p>

            <p className="expiry">
              ⏳ {getTimeLeft(item.expiry)} <br />
              <span className="expiry-date">
                {new Date(item.expiry).toLocaleString("en-IN")}
              </span>
            </p>            
            <button 
              className="request-btn"
              onClick={() => setSelectedFood(item)}
            >
              View
            </button>
          </div>
        ))}

      </div>
    {selectedFood && (
  <div className="modal-overlay">
    <div className="modal">

      {/* ❌ CLOSE BUTTON */}
      <button 
        className="close-btn"
        onClick={() => setSelectedFood(null)}
      >
        ✖
      </button>

      {/* LEFT IMAGE */}
      <img
        src={`http://localhost:5000/uploads/${selectedFood.image}`}
        alt="food"
        className="modal-img"
      />

      {/* RIGHT CONTENT */}
      <div className="modal-content">

        <h2>{selectedFood.title}</h2>

        <p><strong>City:</strong> {selectedFood.location?.city}</p>
        <p><strong>Address:</strong> {selectedFood.location?.address}</p>
        <p><strong>Pincode:</strong> {selectedFood.location?.pincode}</p>

        <p><strong>Details:</strong> {selectedFood.details || "N/A"}</p>
        <p><strong>Contact:</strong> {selectedFood.contactName || "N/A"}</p>

        <button 
          className="request-btn"
          onClick={() => handleRequest(selectedFood._id)}
        >
          Request
        </button>

      </div>

    </div>
  </div>
)}

    </div>
  );
};

export default FindFood;