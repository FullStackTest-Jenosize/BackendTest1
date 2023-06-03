import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import styles from "../styles/login.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

//การทำงานในส่วนของหน้าหลัก
export default function Home() {

  const [state, setState] = useState({
    email: "",
    password:""
  });
  const {email} = state;
  const {password} = state;
  const handleGoogleSignin = () => {};
  const handleFacebookSignin = () => {};
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <div>
      <div id={styles.logreg_forms}>
        <form className={styles.form_signin} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>
            Sign in 
          </h1>
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
            className="form-control"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            value={email}
            required
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={password}
            required
          />
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
