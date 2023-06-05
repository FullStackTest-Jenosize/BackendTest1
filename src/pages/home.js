import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, logoutInitiate } from "../redux/action";
import { auth } from "../redux/firebase";
import UserRoute from "../components/UserRoute";
import styles from "../styles/home.module.css";
import Link from "next/link";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
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

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  };

  return (
    <div>
      <UserRoute>
        <div className={styles.title}>
          <h2>Welcome</h2>
        </div>

        <div className={styles.button_game24}>
          <Link href="/game24" className={styles.button_24}>
            <span className="text">Game24</span>
          </Link>
        </div>

        <div className={styles.button_restuarants}>
          <Link href="/restaurants" className={styles.button_24}>
            <span className="text">Restaurants API</span>
          </Link>
        </div>

        <div className={styles.button_logout}>
          <button className="btn btn-danger" onClick={handleAuth}>
            Logout
          </button>
        </div>
      </UserRoute>
    </div>
  );
};

export default HomePage;
