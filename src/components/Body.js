import Restaurantcard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(inputText, restaurants) {
  return restaurants.filter((restaurant) =>
    restaurant.name.includes(inputText)
  );
}

const Body = () => {
  let [inputText, changeInputText] = useState();
  let [allRestaurants, setAllRestaurants] = useState([]);
  let [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    getRestaurantList();
  }, []);

  async function getRestaurantList() {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      setAllRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
          (restaurant) => restaurant.info
        )
      );
      setFilteredRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
          (restaurant) => restaurant.info
        )
      );
    } catch (error) {
      setAllRestaurants(-1);
    }
  }

  if (allRestaurants === -1)
    return <h1>Failed to fetch data due to some technical difficulties!</h1>;

  if (filteredRestaurants === -1) return <h1>No restaurant found!</h1>;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
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
            const data = filterData(inputText, allRestaurants);
            if (data.length === 0) setFilteredRestaurants(-1);
            else setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurantList">
        {
          filteredRestaurants.map((restaurant) => {
            return (
              <Link key={restaurant.id} to={"/restaurant/" + restaurant.id}>
                <Restaurantcard {...restaurant} />
              </Link>
            );
          })
          //Note: no key <<<<<<<<< index << unique key. Unique key is best practice, avoid index as key.
        }
      </div>
    </>
  );
};

export default Body;
