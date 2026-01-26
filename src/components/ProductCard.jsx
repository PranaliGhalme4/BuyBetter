import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaCheck } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.id === product.id);
  });

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  console.log("local storage cart:", localStorage.getItem("cart"));
  console.log("local storage wishlist:", localStorage.getItem("wishlist"));

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingProduct = cart.find((item) => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, increase quantity
      existingProduct.quantity += 1;
    } else {
      // If product doesn't exist, add it with quantity 1
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Dispatch custom event to update cart count in other components
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Show added state
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    
    // Get existing wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (isWishlisted) {
      // Remove from wishlist if already exists
      const filteredWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      setIsWishlisted(false);
    } else {
      // Add to wishlist if doesn't exist
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
      });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
    
    // Dispatch custom event to update wishlist count in other components
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper" onClick={handleProductClick}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
        <button
          className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
          onClick={handleAddToWishlist}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className="product-card-content">
        <h3 className="product-card-name" onClick={handleProductClick}>
          {product.name}
        </h3>
        <div className="product-card-footer">
          <p className="product-card-price">${product.price}</p>
          <button
            className={`add-to-cart-btn ${isAdded ? "added" : ""}`}
            onClick={handleAddToCart}
            title="Add to cart"
          >
            {isAdded ? (
              <>
                <FaCheck /> Added
              </>
            ) : (
              <FaShoppingCart />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}