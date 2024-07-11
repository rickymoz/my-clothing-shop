import React, { useState } from "react";
import axios from "axios";
import "./ProductInfo.css";

const ProductInfo = ({ onSaveToFirestore }) => {
  const [productUrl, setProductUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");

    try {
      const productId = extractProductIdFromUrl(productUrl);

      if (!productId) {
        setLoading(false);
        setError("URL do produto inválido. Por favor, insira um URL válido.");
        return;
      }

      const options = {
        method: "GET",
        url: "https://vinted3.p.rapidapi.com/getProduct",
        params: {
          country: "us",
          productId: productId,
        },
        headers: {
          "x-rapidapi-key":
            "a99a7e3850msh2adf2fae5f4a5f6p1718b0jsne80cc5349420",
          "x-rapidapi-host": "vinted3.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      onSaveToFirestore(productUrl, response.data);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError("Erro ao buscar o produto. Verifique o URL e tente novamente.");
      console.error("Erro ao buscar o produto:", error);
    }
  };

  const extractProductIdFromUrl = (url) => {
    const match = url.match(/items\/(\d+)/);
    return match ? match[1] : null;
  };

  const handleInputChange = (event) => {
    setProductUrl(event.target.value);
  };

  const handleButtonClick = async () => {
    await fetchProduct();
  };

  return (
    <div className="product-info">
      <h2>Buscar Produto por URL</h2>
      <div className="input-group">
        <label htmlFor="product-url">URL do Produto:</label>
        <input
          type="text"
          id="product-url"
          value={productUrl}
          onChange={handleInputChange}
          placeholder="Insira o URL completo do produto"
        />
        <button onClick={handleButtonClick} disabled={loading}>
          {loading ? "Buscando..." : "Buscar e Enviar"}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ProductInfo;
