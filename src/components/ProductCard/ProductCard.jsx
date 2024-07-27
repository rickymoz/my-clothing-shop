import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import AdminControls from "../../components/AdminControls/AdminControls";
import "./ProductCard.css";

const formatPrice = (price) => {
  if (typeof price === "string") {
    const [integerPart, decimalPart] = price.split(".");
    if (decimalPart === "0" || decimalPart === "00") {
      return integerPart;
    }
    return price.replace(".", ",");
  }
  return "0";
};

const ProductCard = ({ product, admin }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <div>Product data is missing</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleDelete = () => {
    console.log(`Product ${product.title} deleted`);
  };

  const handleAdd = () => {
    console.log(`Product ${product.title} added`);
  };

  const handleEdit = () => {
    console.log(`Product ${product.title} edited`);
  };

  return (
    <div className="product-card">
      <div className="product-image-slider">
        <button className="slider-button prev" onClick={prevImage}>
          <ChevronLeft />
        </button>
        <img
          src={
            product.images[currentImageIndex] ||
            "https://via.placeholder.com/200"
          }
          alt={`${product.title || "Product"} - Image ${currentImageIndex + 1}`}
        />
        <button className="slider-button next" onClick={nextImage}>
          <ChevronRight />
        </button>
        <div className="slider-dots">
          {product.images.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${
                index === currentImageIndex ? "active" : ""
              }`}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.title || "Untitled"}</h3>
        <div className="price-container">
          <div className="price">
            <span className="new-price">{formatPrice(product.price)} €</span>
          </div>
          <button className="add-to-cart" aria-label="Add to cart">
            <ShoppingCart />
          </button>
        </div>
      </div>
      {admin && (
        <AdminControls
          handleDelete={handleDelete}
          handleAdd={handleAdd}
          handleEdit={handleEdit}
        />
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  admin: PropTypes.bool,
};

export default ProductCard;
