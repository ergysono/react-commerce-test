import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {
  const skuRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error, loading } = useFetch("products/" + id);
  if (loading) {
    return <Spinner />;
  }
  if (!product) {
    return <PageNotFound />;
  }
  // se viene lanciato questo errore mostra uno stack trace in FE
  if (error) {
    throw error;
  }

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" ref={skuRef}>
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            const sku = skuRef.current.value;
            if (!sku) {
              return alert("Select size.");
            }
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
