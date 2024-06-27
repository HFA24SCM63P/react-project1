import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { IMG_CDN_URL } from "../config";

const RestaurantMenu = () => {
  function helper() {
    return restaurant?.cards[2]?.card?.card?.info?.isOpen ? true : false;
  }

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.61610&lng=73.72860&restaurantId=" +
        id +
        "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    setRestaurant(json.data);
  }

  const { id } = useParams();
  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu-card">
      <img
        src={
          IMG_CDN_URL +
          restaurant?.cards[2]?.card?.card?.info?.cloudinaryImageId
        }
      />
      <h1>{restaurant?.cards[0]?.card?.card?.text}</h1>
      <h2>{"City: " + restaurant?.cards[2]?.card?.card?.info?.city}</h2>
      <h3>{"Area: " + restaurant?.cards[2]?.card?.card?.info?.locality}</h3>
      <h3>{"Rating: " + restaurant?.cards[2]?.card?.card?.info?.avgRating}</h3>
      <h4 className={helper() ? "green" : "red"}>
        {helper() ? "Open" : "Closed"}
      </h4>
      <ul>
        {restaurant?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards.map(
          (item) => {
            return <li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>;
          }
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
