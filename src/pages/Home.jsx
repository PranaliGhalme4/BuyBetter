import { useState } from "react";
import products from "../data/products.json";
import FilterCard from "../components/FilterCard";
import ProductList from "../components/ProductList";
import "../home.css";

const Home = () => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);

  const filteredProducts = products.filter((product) => {
    return (
      (category === "all" || product.category === category) &&
      product.price <= price &&
      product.rating >= rating
    );
  });

  console.log("filtered products", filteredProducts);

  return (
    <div className="home-layout">
      <FilterCard
        selectedCategory={category}
        setSelectedCategory={setCategory}
        price={price}
        setPrice={setPrice}
        rating={rating}
        setRating={setRating}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Home;
