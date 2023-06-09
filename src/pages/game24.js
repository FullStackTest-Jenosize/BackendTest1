import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/game24.module.css";
import { useDispatch } from "react-redux";
import { auth } from "../redux/firebase";
import { setUser } from "../redux/action";
import UserRoute from "../components/UserRoute";

export default function Game24() {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
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

  const handleNumbersChange = (event) => {
    setNumbers(event.target.value);
    setResult("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://api-backend-five.vercel.app/api/game24", {
        numbers: numbers.split(""),
      });
      setResult(response.data.result);
      console.log("Input:", { numbers: numbers.split("") });
      console.log("Output:", response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <UserRoute>
      <div className={styles.game24_container}>
        <form onSubmit={handleSubmit}>
          <h2>Game 24</h2>
          {error && (
            <div className={styles.error_message}>
              <p>Error: {error}</p>
            </div>
          )}
          <label>
            <div>Enter 4 Numbers (1-9):</div>

            <input
              className={styles.line_height}
              type="text"
              value={numbers}
              onChange={handleNumbersChange}
              placeholder="ex.1234"
            />
          </label>
          <div className={styles.line_height}>
            <button class="btn btn-info" type="submit">
              Calculate
            </button>
          </div>
        </form>
        {result && (
          <div className={styles.result_container}>
            <p>Result: {result}</p>
          </div>
        )}
      </div>
    </UserRoute>
  );
}
