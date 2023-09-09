import type { ReactElement, ReactNode } from "react";
import { CartProvider } from "../contexts/card/cardContext";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Layout from "../templates/layout";
import React from "react";
import "../styles/index.scss";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />); //admin layout
  }
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
