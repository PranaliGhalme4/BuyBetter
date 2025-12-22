import "../FilterCard.css";

const FilterCard = ({
  selectedCategory,
  setSelectedCategory,
  price,
  setPrice,
  rating,
  setRating
}) => {
  return (
    <div className="filter-card">
      <h3>Filters</h3>

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
          step="10"
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
