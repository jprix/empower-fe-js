import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/option3.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/empower-horizontal-logo.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
