import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useAdminCheck = (setIsAdmin) => {
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          const q = query(collection(db, "users"), where("token", "==", token));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            console.log("Admin token found in DB.");
            setIsAdmin(true);
          } else {
            console.log("Admin token not found in DB.");
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        console.log("No token found in localStorage.");
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [setIsAdmin]);
};

export default useAdminCheck;
