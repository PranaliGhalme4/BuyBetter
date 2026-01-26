import { lazy, useState, Suspense, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import products from "../data/products.json";
import ProductList from "../components/ProductList";
import "../home.css";

const FilterCard = lazy(() => import("../components/FilterCard"));

const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(200);
  const [rating, setRating] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [wishlistCount, setWishlistCount] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.length;
  });

  // Update wishlist count when wishlist changes
  useEffect(() => {
    const handleWishlistUpdate = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    // Listen for custom wishlist update event
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  });

  // Update cart count when cart changes
  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(totalQuantity);
    };

    // Listen for custom cart update event
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product?.name?.toLowerCase().includes(search.toLowerCase()) &&
        (category === "all" ||
          product.category.toLowerCase() === category.toLowerCase()) &&
        product.price <= price &&
        product.rating >= rating
      );
    });
  }, [search, category, price, rating]);


  return (
    <div className="home-page">
      <div className="home-header">
        <div className="product-count">
          <h4>Total Products: {filteredProducts?.length}</h4>
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
        <button 
          className="wishlist-header-btn"
          onClick={() => navigate("/wishlist")}
          title="View Wishlist"
        >
          <FaHeart /> Wishlist ({wishlistCount})
        </button>
        <button 
          className="cart-header-btn"
          onClick={() => navigate("/cart")}
          title="View Cart"
        >
          <FaShoppingCart /> Cart ({cartCount})
        </button>
      </div>

      <Suspense fallback={<div className="loading-filters">Loading filters...</div>}>
        <div className="home-layout">
          <FilterCard
            selectedCategory={category}
            setSelectedCategory={setCategory}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            totalProducts={filteredProducts?.length}
            open={open}
            setOpen={setOpen}
          />

          {filteredProducts?.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="no-data">
              <h2>No products found 😕</h2>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default Home;
