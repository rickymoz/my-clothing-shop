import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ProductCard from "../../components/ProductCard/ProductCard";
import useAdminCheck from "../../hooks/useAdminCheck";
import "./RelatedProducts.css";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useAdminCheck(setIsAdmin); // Usar o hook

  useEffect(() => {
    console.log("isAdmin state in RelatedProducts:", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="related-products">
      <h2>Related Products</h2>
      <div className="products-grid">
        {products.map(
          (product) =>
            product && (
              <ProductCard
                key={product.id}
                product={{
                  title: product.productTitle || "Untitled",
                  images: product.productImages || [],
                  price: product.productPrice || "0",
                }}
                admin={isAdmin}
              />
            )
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
