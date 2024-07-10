import React, { useState } from "react";
import axios from "axios";

const ProductInfo = () => {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    const options = {
      method: "GET",
      url: "https://vinted3.p.rapidapi.com/getProduct",
      params: {
        country: "us",
        productId: productId,
      },
      headers: {
        "x-rapidapi-key": "a99a7e3850msh2adf2fae5f4a5f6p1718b0jsne80cc5349420",
        "x-rapidapi-host": "vinted3.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setProductData(response.data);
      setError("");
    } catch (error) {
      setError("Erro ao buscar o produto. Verifique o ID e tente novamente.");
      setProductData(null);
      console.error("Erro ao buscar o produto:", error);
    }
  };

  const handleInputChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSearchClick = () => {
    fetchProduct();
  };

  return (
    <div>
      <h2>Buscar Produto por ID</h2>
      <div>
        <label htmlFor="product-id">ID do Produto:</label>
        <input
          type="text"
          id="product-id"
          value={productId}
          onChange={handleInputChange}
          placeholder="Insira o ID do produto"
        />
        <button onClick={handleSearchClick}>Buscar</button>
      </div>

      {error && <p>{error}</p>}

      {productData && (
        <div>
          <h3>{productData.title}</h3>
          <div>
            {productData.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Imagem ${index}`}
                style={{ maxWidth: "200px", marginRight: "10px" }}
              />
            ))}
          </div>
          <p>price:{productData.price.amount}</p>
          <p>fees:{productData.price.fees}</p>
          <p>total price:{productData.price.totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
