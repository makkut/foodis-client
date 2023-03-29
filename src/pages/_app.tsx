import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { theme } from "./../styles/theme/theme";
import { Provider } from "react-redux";
import store, { persistor } from "../state";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {() => (
          <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ChakraProvider>
                <SessionProvider session={session}>
                  <Component {...pageProps} />
                </SessionProvider>
              </ChakraProvider>
            </ThemeProvider>
          </>
        )}

        {/* <CssBaseline />
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider> */}
      </PersistGate>
    </Provider>
  );
}
