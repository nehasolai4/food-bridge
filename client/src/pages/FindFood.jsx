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

            {/* IMAGE PLACEHOLDER */}
            <img
  src={`http://localhost:5000/uploads/${item.image}`}
  alt="food"
  className="food-img"
/>

            <h3>{item.title}</h3>

            <p className="desc">{item.location?.city}</p>
            <p className="qty">{item.quantity}</p>

            <p className="expiry">⏳ {item.expiry}</p>

            <button className="request-btn">Request</button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default FindFood;