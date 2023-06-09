import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/restuarants.module.css";
import { useDispatch } from "react-redux";
import { auth } from "../redux/firebase";
import { setUser } from "../redux/action";
import UserRoute from "../components/UserRoute";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api-backend-five.vercel.app/api/restaurants?query=${encodeURIComponent(query)}`
      );
      setResults(response.data);
      console.log(`https://api-backend-five.vercel.app/api/restaurants?query=${encodeURIComponent(query)}`);
      console.log(JSON.stringify(results, null, 3));
    } catch (error) {
      console.error(error);
      setResults(null);
    }
  };

  return (
    <UserRoute>
      <div className={styles.container}>
        <h2>Find Restaurants</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Search
        </button>
      </div>

      {results && <pre>{JSON.stringify(results, null, 3)}</pre>}
    </UserRoute>
  );
}
