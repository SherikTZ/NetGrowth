import React, { useEffect, useState } from "react";
import axios from "axios";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Verify() {
  const [verificationStatus, setVerificationStatus] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          `${VITE_BACKEND_API_URL}/verify:${document.cookie}`,
          {
            token: document.cookie,
          }
        );

        if (response.status === 200) {
          setVerificationStatus("Verification Successful");
        } else {
          setVerificationStatus("Verification Failed");
        }
      } catch (error) {
        console.error("Error:", error);
        setVerificationStatus("Verification Failed");
      }
    };

    verifyToken();
  }, []);

  return (
    <div>
      <h1>{verificationStatus}</h1>
    </div>
  );
}
