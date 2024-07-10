import React from "react";
import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./FrontPage.css";
import { Link } from "react-router-dom";

const FrontPage = () => {
  return (
    <div className="front-page">
      <div className="content-wrapper">
        <main className="main-content">
          <Hero />
          <div className="product-list">
            <ProductCard
              title="Producto 1"
              description="Descripción del producto 1"
            />
            <ProductCard
              title="Producto 2"
              description="Descripción del producto 2"
            />
            <ProductCard
              title="Producto 3"
              description="Descripción del producto 3"
            />
          </div>
          <div className="btn-show-more">
            <Link to="/products">
              <button className="hero-cta">Ver más</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FrontPage;
