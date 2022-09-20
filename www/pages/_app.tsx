import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import withUrql from "../utils/client";
import Header from "../components/header/Header";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ThemeProvider defaultTheme="cupcake">
      <div className="container max-w-5xl mx-auto">
        <Header />
        <Component {...pageProps} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </ThemeProvider>
  );
}

export default withUrql(MyApp);
