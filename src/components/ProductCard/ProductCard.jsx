import React from "react";
import "./ProductCard.css";

const ProductCard = ({ title, description, imageUrl }) => (
  <div className="product-card">
    <img src={imageUrl} alt={title} className="product-image" />
    <h3 className="product-title">{title}</h3>
    <p className="product-description">{description}</p>
  </div>
);

export default ProductCard;
