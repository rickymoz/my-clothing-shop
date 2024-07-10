import React, { useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Contact = () => {
  let [storedContacts, setStoredContacts] = useState([]);

  const fetchDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
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
      <button onClick={fetchDataFromFirestore}>Fetch from Firestore</button>
      <div>
        {storedContacts.map((item, index) => (
          <div key={index}>
            <p>User: {item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
