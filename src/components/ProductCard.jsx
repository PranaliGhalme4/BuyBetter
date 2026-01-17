import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  console.log("local storage cart:", localStorage.getItem("cart"));

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
    
    // Show added state
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper" onClick={handleProductClick}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
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
            {isAdded ? "✓ Added" : "🛒"}
          </button>
        </div>
      </div>
    </div>
  );
}