import "./filterCard.css";
import { FaFilter } from "react-icons/fa";

const FilterCard = ({
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
  rating,
  setRating,
  setOpen,
  open
}) => {
  console.log("selected values", selectedCategory, price, rating)
  return (
    <div className="filter-card">
      <div
        className="filter-header"
        style={{display:"flex", justifyContent:"space-between"}}
        onClick={() => {
            setSelectedCategory("all");
            setPrice(200);
            setRating(0);
          setOpen(!open);
        }}
      >
        <div style={{fontSize:20}}>
  <span>Filters</span>
        </div>
      
        <FaFilter style={{cursor:"pointer", paddingTop:5}} className="filter-icon" />
      </div>

      {/* Category */}
      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>

      {/* Price */}
      <div className="filter-group">
        <label>Max Price: ₹{price}</label>
        <input
          type="range"
          min="1"
          max="200"
          step="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Rating */}
      <div className="filter-group">
        <label>Minimum Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="0">All</option>
          <option value="3">3 ⭐ & above</option>
          <option value="4">4 ⭐ & above</option>
        </select>
      </div>
    </div>
  );
};

export default FilterCard;
