import React, { useState } from "react";
import axios from "axios";

const ProductInfo = ({ onSaveToFirestore }) => {
  const [productUrl, setProductUrl] = useState("");
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      // Extrair o ID do URL do produto
      const productId = extractProductIdFromUrl(productUrl);

      // Verificar se o productId foi extraído corretamente
      if (!productId) {
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
      onSaveToFirestore(productUrl, response.data); // Envia o URL do produto e os dados para salvar na Firestore
      setError("");
    } catch (error) {
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
    await fetchProduct(); // Busca o produto e envia para a Firestore
  };

  return (
    <div>
      <h2>Buscar Produto por URL</h2>
      <div>
        <label htmlFor="product-url">URL do Produto:</label>
        <input
          type="text"
          id="product-url"
          value={productUrl}
          onChange={handleInputChange}
          placeholder="Insira o URL completo do produto"
        />
        <button onClick={handleButtonClick}>Buscar e Enviar</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProductInfo;
