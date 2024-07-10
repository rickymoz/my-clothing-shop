import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"; // Assumindo que firebase.js está na pasta src

const Products = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const saveDataToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        productName,
        productPrice,
      });
      alert("Document written to Database");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <p>Lista de produtos...</p>

      <h1>Save Data to Firebase Firestore</h1>
      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product Name"
      />
      <input
        type="text"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        placeholder="Product Price"
      />
      <button onClick={saveDataToFirestore}>Save to Firestore</button>
    </div>
  );
};

export default Products;
