import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser, logoutInitiate } from "../redux/action";
import { auth } from "../redux/firebase";
import UserRoute from "../components/UserRoute";
import styles from "../styles/home.module.css";

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
