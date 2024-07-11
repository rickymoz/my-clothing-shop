import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import "./Admin.css";

const AdminPage = () => {
  const [productUrl, setProductUrl] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const saveProductToFirestore = async (url, data) => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const { title, images, price } = data;
      await addDoc(collection(db, "products"), {
        productTitle: title,
        productImages: images,
        productPrice: price.amount,
        productUrl: url,
      });
      setLoading(false);
      setSuccessMessage("Produto enviado para o banco de dados com sucesso!");
    } catch (e) {
      setLoading(false);
      setError("Erro ao adicionar o produto: " + e.message);
      console.error("Erro ao adicionar o produto: ", e);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-mode-warning">
        <p className="warning-text">ESTÁS EN LA CONFIGURACION DE LA PÁGINA!</p>
      </div>
      <h1>ADMIN - CONTROL PANEL</h1>
      <ProductInfo onSaveToFirestore={saveProductToFirestore} />
      {loading && <p className="loading-text">Salvando produto...</p>}
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
    </div>
  );
};

export default AdminPage;
