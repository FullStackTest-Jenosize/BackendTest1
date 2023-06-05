import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fbSignInInitiate, googleSignInInitiate, loginInitiate,} from "../redux/action";
import styles from "../styles/login.module.css";

//การทำงานในส่วนของหน้าหลัก
export default function Login() {

  const [state, setState] = useState({
    email: "",
    password:""
  });
  const { currentUser } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/home");
    }
  }, [currentUser, router]);
  const dispatch = useDispatch();
  const {email,password} = state;
  const handleGoogleSignin = () => {
    dispatch(googleSignInInitiate());
  };
  const handleFacebookSignin = () => {
    dispatch(fbSignInInitiate());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginInitiate(email, password));
    setState({ email: "", password: "" });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div>
      <div id={styles.logreg_forms}>
        <form className={styles.form_signin} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>
            Sign in 
          </h1>
            {error && <div className={styles.alert_danger}><p>{error}</p></div>}
          <div className={styles.social_login}>
            {/* Google+ */}
            <button className={styles.google_btn} type="button" onClick={handleGoogleSignin}>
              <span>
                <FontAwesomeIcon icon={faGooglePlusG} /> Sign in with Google+
              </span>
              
            </button>
            {/* Facebook */}
            <button className={styles.facebook_btn} type="button" onClick={handleFacebookSignin}>
              <FontAwesomeIcon icon={faFacebookF} /> Sign in with Facebook
            </button>
          </div>
          <p style={{textAlign: "center"}}>OR</p>
          <input
            type="email"
            id="inputEmail"
            className={styles.form_control}
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            value={state.email}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className={styles.form_control}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={state.password}
            required
          />
          <br />
          <button className="btn btn-secondary btn-block" type="submit">Sign in</button>
          <hr />
          <p>{"Don't have an account"}</p>
          <Link href="/register">
            <button className="btn btn-primary btn-block" type="button" id={styles.btn_signup}>
            <FontAwesomeIcon icon={faUserPlus} /> Sign up New Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
