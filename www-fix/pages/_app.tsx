import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppInitialProps, AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import withUrql from "../utils/client";
import Header from "../components/header/Header";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider defaultTheme="cupcake">
      <div className="container max-w-5xl mx-auto">
        <Header />
        {getLayout(<Component {...pageProps} />)}
      </div>
    </ThemeProvider>
  );
}

export default withUrql(MyApp);
