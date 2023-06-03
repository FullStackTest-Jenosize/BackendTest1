import { Html, Head, Main, NextScript } from 'next/document';
import {Provider} from "react-redux";
import { store } from "../redux/store";

export default function Document() {
  return (
    <Html lang="en">
      <Provider store={store}>
        <Head />
          <body>
            <Main />
            <NextScript />
          </body>
      </Provider>
    </Html>
  )
}
