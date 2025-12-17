import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";


export default function ProductDetails() {
const { id } = useParams();
const navigate = useNavigate();


const product = products.find((p) => p.id === Number(id));


if (!product) return <p>Product not found</p>;


return (
<div className="details">
<button onClick={() => navigate(-1)}>⬅ Back</button>
<img src={product.image} alt={product.name} />
<h2>{product.name}</h2>
<p>{product.description}</p>
<p><strong>Price:</strong> ${product.price}</p>
<p><strong>Rating:</strong> {product.rating}</p>
<p><strong>Stock:</strong> {product.stock}</p>
</div>
);
}