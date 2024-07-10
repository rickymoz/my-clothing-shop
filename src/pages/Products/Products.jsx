import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import ProductInfo from "../../components/ProductInfo/ProductInfo";

const Products = () => {
  const [productUrl, setProductUrl] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");

  const saveProductToFirestore = async (url, data) => {
    try {
      const { title, images, price } = data;
      const docRef = await addDoc(collection(db, "products"), {
        productTitle: title,
        productImages: images,
        productPrice: price.amount, // Supondo que você queira apenas o valor do preço
        productUrl: url, // Salva o URL do produto na Firestore
      });
      alert("Produto enviado para o banco de dados");
    } catch (e) {
      setError("Erro ao adicionar o produto: " + e.message);
      console.error("Erro ao adicionar o produto: ", e);
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <ProductInfo onSaveToFirestore={saveProductToFirestore} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Products;
