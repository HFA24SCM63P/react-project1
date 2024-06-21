import Restaurantcard from "./RestaurantCard"
import { restaurantData } from "../config"

const Body = () => {
    return (
        <div className="restaurantList">
            {
                restaurantData.map(restaurant=>{
                    return <Restaurantcard {...restaurant} key={restaurant.id}/>
                })
                //Note: no key <<<<<<<<< index << unique key. Unique key is best practice, avoid index as key.
            }
        </div>
    )
}

export default Body