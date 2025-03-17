import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme"; // ✅ Ensure this path matches your project structure
import LaunchDarklyProvider from "../providers/LaunchDarkly";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/empower-horizontal-logo.svg"
        />
      </Head>
      <LaunchDarklyProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures consistent styling */}
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </LaunchDarklyProvider>
    </>
  );
}

export default MyApp;
