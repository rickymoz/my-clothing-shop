import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import ProductInfo from "../../components/ProductInfo/ProductInfo";
import "./Admin.css";

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const saveProductToFirestore = async (url, data) => {
    setLoading(true);
    try {
      const { title, images, price } = data;
      await addDoc(collection(db, "products"), {
        productTitle: title,
        productImages: images,
        productPrice: price.amount,
        productUrl: url,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="admin-card">
            <h3>ADD PRODUCT</h3>
            <ProductInfo onSaveToFirestore={saveProductToFirestore} />
          </div>
        );
      case 2:
        return (
          <div className="admin-card">
            <h3>ANOTHER STEP</h3>
            <ProductInfo onSaveToFirestore={saveProductToFirestore} />
          </div>
        );
      case 3:
        return (
          <div className="admin-card">
            <h3>YET ANOTHER STEP</h3>
            <ProductInfo onSaveToFirestore={saveProductToFirestore} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-steps">
        <div className="admin-step" onClick={() => setCurrentStep(1)}>
          1
        </div>
        <div className="admin-step" onClick={() => setCurrentStep(2)}>
          2
        </div>
        <div className="admin-step" onClick={() => setCurrentStep(3)}>
          3
        </div>
      </div>
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminPage;
