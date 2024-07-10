import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Products = () => {
  const [message, setMessage] = useState("");

  const saveMessageToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        message,
      });
      alert("Message sent to Database");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h1>Produtos</h1>
      <p>Lista de produtos...</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
      />
      <button onClick={saveMessageToFirestore}>Send Message</button>
    </div>
  );
};

export default Products;
