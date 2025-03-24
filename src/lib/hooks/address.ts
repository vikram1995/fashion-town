import { useEffect, useState } from "react";
import { authClient } from "../auth/auth-client";

export const useSavedAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedAddresses = async () => {
    setLoading(true);
    try {
      const { data } = await authClient.getSession();
      const userId = data?.user.id;
      if (userId) {
        const res = await fetch(`/api/users/${userId}/addresses`);
        const data = await res.json();
        setAddresses(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedAddresses();
  }, []);

  return { addresses, setAddresses, loading };
};
