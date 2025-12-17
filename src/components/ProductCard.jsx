import { useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {
const navigate = useNavigate();


return (
<div
className="card"
onClick={() => navigate(`/product/${product.id}`)}
>
<img src={product.image} alt={product.name} />
<h3>{product.name}</h3>
<p>${product.price}</p>
</div>
);
}