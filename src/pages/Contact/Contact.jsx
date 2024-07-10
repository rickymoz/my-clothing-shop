import React, { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Assumindo que firebase.js está na pasta src

const Contact = () => {
  const [message, setMessage] = useState("");
  let [storedContacts, setStoredContacts] = useState([]);

  const saveMessageToFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        message,
      });
      alert("Message sent to Database");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const temporaryArr = [];
    querySnapshot.forEach((doc) => {
      temporaryArr.push(doc.data());
    });
    setStoredContacts(temporaryArr);
  };

  return (
    <div>
      <h1>Contact</h1>
      <p>Contact...</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
      />
      <button onClick={saveMessageToFirestore}>Send Message</button>
      <div>
        <button onClick={fetchDataFromFirestore}>Fetch from Firestore</button>
        <div>
          {storedContacts.map((item, index) => (
            <div key={index}>
              <p>User: {item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
