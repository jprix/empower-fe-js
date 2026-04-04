import { ThemeProvider, CssBaseline } from "@mui/material";
import { Analytics } from "@vercel/analytics/next";
import theme from "../theme";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/option3.css";

function MyApp({ Component, pageProps }) {
  const disableSiteChrome = Component.disableSiteChrome;
  const disableSiteHeader = disableSiteChrome || Component.disableSiteHeader;
  const disableSiteFooter = disableSiteChrome || Component.disableSiteFooter;

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon_E_empower.svg" />
        <link rel="shortcut icon" href="/favicon_E_empower.svg" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!disableSiteHeader && <Header />}
        <Component {...pageProps} />
        {!disableSiteFooter && <Footer />}
        <Analytics />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
