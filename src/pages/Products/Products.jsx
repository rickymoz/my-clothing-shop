import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Products = () => {
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
    <div>
      <h1>Lista de Produtos</h1>
      {products.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.productTitle}</h3>
              <p>
                URL do produto:{" "}
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </a>
              </p>
              <div>
                <p>Preço: R${product.productPrice}</p>
                {product.productImages.length > 0 && (
                  <div>
                    <p>Imagens:</p>
                    <div style={{ display: "flex" }}>
                      {product.productImages.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Imagem ${index + 1}`}
                          style={{
                            maxWidth: "200px",
                            maxHeight: "200px",
                            marginRight: "10px",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
