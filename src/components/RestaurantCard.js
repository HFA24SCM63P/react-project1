import { IMG_CDN_URL } from "../config"

const Restaurantcard = ({cloudinaryImageId, name, avgRating, cuisines}) => {
    return (
        <div className="card">
            <img src={IMG_CDN_URL.concat(cloudinaryImageId)} />
            <h2>{name}</h2>
            <h3>{avgRating}</h3>
            <h4>{cuisines.join(", ")}</h4>
        </div>
    )
}

export default Restaurantcard