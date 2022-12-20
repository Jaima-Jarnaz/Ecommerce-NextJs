import type { AppProps } from "next/app";
import Layout from "../templates/layout";

import React from "react";
import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
