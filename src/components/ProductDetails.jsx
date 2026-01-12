import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import "../styles/productDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout for ${product.name}`);
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-details-wrapper">
        {/* Product Image Section */}
        <div className="product-image-section">
          <div className="product-image-wrapper">
            <img src={product.image} alt={product.name} className="product-detail-image" />
          </div>
          <div className="product-badges">
            {product.stock > 30 && <span className="badge in-stock">In Stock</span>}
            {product.stock <= 10 && <span className="badge low-stock">Low Stock</span>}
            {product.rating >= 4.5 && <span className="badge best-seller">⭐ Best Seller</span>}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-short-description">{product.shortDescription}</p>
            <div className="product-meta">
              <span className="category-tag">{product.category}</span>
              <div className="rating-container">
                <span className="rating-value">{product.rating}</span>
                <span className="stars">★★★★☆</span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <span className="current-price">${product.price}</span>
            <span className="original-price">${(product.price * 1.2).toFixed(2)}</span>
            <span className="discount-badge">-17%</span>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3>Product Description</h3>
            <p className="product-description">{product.description}</p>
          </div>

          {/* Product Details Grid */}
          <div className="product-details-grid">
            <div className="detail-item">
              <span className="detail-label">Availability</span>
              <span className={`detail-value ${product.stock > 0 ? "available" : "unavailable"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">SKU</span>
              <span className="detail-value">PRD-{String(product.id).padStart(4, "0")}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category</span>
              <span className="detail-value">{product.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rating</span>
              <span className="detail-value">{product.rating} / 5.0</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="buy-now-button" onClick={handleBuyNow} disabled={product.stock === 0}>
              🛒 Buy Now
            </button>
            <button className="add-to-cart-button" onClick={handleAddToCart} disabled={product.stock === 0}>
              ❤️ Add to Cart
            </button>
          </div>

          {/* Guarantee */}
          <div className="guarantee-section">
            <p>✓ 30-day money-back guarantee</p>
            <p>✓ Free shipping on orders over $50</p>
            <p>✓ 24/7 customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}