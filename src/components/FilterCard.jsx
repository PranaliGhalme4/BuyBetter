import "./filterCard.css";
import { FaFilter } from "react-icons/fa";
import products from "../data/products.json";
import { useMemo } from "react";

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

const allCategories = useMemo(() => {
  return ["all", ...new Set(products.map(ele => ele.category))];
}, []);

const maxPrice = products.reduce((acc, nextVal)=>{
  console.log("nextval", nextVal);
  if(acc < nextVal.price){
    acc=nextVal.price;
  }
  return acc;
},0)


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

      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories.map((ele)=>{
           return <option value={ele}>{ele}</option>
          })}
        </select>
      </div>

      <div className="filter-group">
        <label>Max Price: ₹{maxPrice}</label>
        <input
          type="range"
          min="1"
          max={maxPrice}
          step="1"
          value={price? price: maxPrice}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

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
