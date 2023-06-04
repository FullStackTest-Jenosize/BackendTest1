import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from 'next/router';
import styles from "../styles/register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerInitiate } from "@/redux/action";
import "../styles/register.module.css";

export default function Register() {
    
    const [state, setState] = useState({
        displayname: "",
        email: "",
        password:"",
        passwordConfirm: ""
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
      const {email, password, displayName, passwordConfirm} = state;
      const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm){
            return;
        }
        dispatch(registerInitiate(email, password, displayName));
        setState({email: "", displayname: "", password: "", passwordConfirm: ""})
      };
      const handleChange = (e) => {
        let {name,value} = e.target;
        setState({ ...state, [name]: value});
      };
    return(
        <div>
          <div id={styles.register_form}>
            <form className={styles.form_signin} onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}>
                Sign up
              </h1>
              {error && <div className={styles.alert_danger}><p>{error}</p></div>}
              <input
                type="text"
                id="displayName"
                className={styles.form_control}
                placeholder="Full Name"
                name="displayName"
                onChange={handleChange}
                value={state.displayName}
                required
              />
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
              <input
                type="password"
                id="inputRePassword"
                className={styles.form_control}
                placeholder="Repeat Password"
                name="passwordConfirm"
                onChange={handleChange}
                value={state.passwordConfirm}
                required
              />
              <div className={styles.container}><button className="btn btn-primary btn-block" type="submit"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</button>
              </div>
              <Link href="/"><FontAwesomeIcon icon={faAngleLeft} />Back</Link>
            </form>
          </div>
        </div>
    )
}