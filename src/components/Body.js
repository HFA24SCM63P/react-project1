import Restaurantcard from "./RestaurantCard";
import { restaurantData } from "../config";
import { useState } from "react";

function filterData(inputText, restaurantData) {
  return restaurantData.filter((restaurant) =>
    restaurant.name.includes(inputText)
  );
}

const Body = () => {
  let [inputText, changeInputText] = useState();
  let [restaurants, changeRestaurants] = useState(restaurantData);
  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={inputText}
          onChange={(e) => {
            changeInputText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            if (inputText === "") restaurants = restaurantData;
            else restaurants = filterData(inputText, restaurantData);
            changeRestaurants(restaurants);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurantList">
        {
          restaurants.map((restaurant) => {
            return <Restaurantcard {...restaurant} key={restaurant.id} />;
          })
          //Note: no key <<<<<<<<< index << unique key. Unique key is best practice, avoid index as key.
        }
      </div>
    </>
  );
};

export default Body;
