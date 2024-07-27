import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

const Products = () => {
  const [admin, setAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="products-container">
      <h1>Lista de Produtos</h1>
      <button onClick={() => setAdmin(!admin)}>
        {admin ? "Switch to User Mode" : "Switch to Admin Mode"}
      </button>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.productTitle}
              image={product.productImages[0] || ""}
              price={product.productPrice}
              oldPrice={product.productOldPrice}
              isAdmin={admin}
              onSale={product.onSale || false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
