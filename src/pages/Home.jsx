import { useState } from "react";
import products from "../data/products.json";
import FilterCard from "../components/FilterCard";
import ProductList from "../components/ProductList";
import "../home.css";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(200);
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    console.log("product category",product.rating , rating);
    return (
      product?.name?.toLowerCase()?.includes(search?.toLowerCase()) &&
      (category === "all" || product.category.toLowerCase() === category.toLowerCase()) &&
      product.price <= price &&
      product.rating >= rating
    );
  });

  console.log("filtered products", filteredProducts.length);

  return (
    <div className="home-page">
      <div style={{display:"flex", paddingLeft:"30px"}}>
      <div style={{width:"18%"}}>
      <h4>Total Products :{filteredProducts?.length} </h4>
      </div>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
      </div>
      
    
    <div className="home-layout">
      <FilterCard      
        selectedCategory={category}
        setSelectedCategory={setCategory}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
        totalProducts={filteredProducts.length}
      />

      {filteredProducts.length > 0 ? (
  <ProductList products={filteredProducts} />
) : (
  <div className="grid">
    <div style={{width:"max-content"}}>
      <h2> No products found 😕</h2>
      </div>
      <div> 

    </div>
  </div>
)}
    </div>
    </div>
  );
};

export default Home;
