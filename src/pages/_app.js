import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from 'react';
import {Provider} from "react-redux";
import { store } from "../redux/store";

export default function App({ Component, pageProps }) {
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    
  )
}
