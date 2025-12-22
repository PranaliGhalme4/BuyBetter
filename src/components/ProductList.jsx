// import products from "../data/products.json";
import ProductCard from "./ProductCard";


export default function ProductList({products}) {
return (
<div className="grid">
{products.map((product) => (
<ProductCard key={product.id} product={product} />
))}
</div>
);
}