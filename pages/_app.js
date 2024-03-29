import { SWRConfig } from "swr";
import GlobalStyle from "@/styles";

import RootLayout from "@/components/Layout";
import { SelectedTrackProvider } from "@/context/SelectedTrackContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <SelectedTrackProvider>
        <ThemeProvider>
          <SessionProvider session={session}>
            <GlobalStyle />
            <RootLayout>
              <SWRConfig value={{ fetcher }}>
                <Component {...pageProps} />
              </SWRConfig>
            </RootLayout>
          </SessionProvider>
        </ThemeProvider>
      </SelectedTrackProvider>
    </>
  );
}
