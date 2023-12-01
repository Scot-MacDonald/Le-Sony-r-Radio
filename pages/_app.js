import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import RootLayout from "@/components/Layout";
import { SelectedTrackProvider } from "@/context/SelectedTrackContext";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <SelectedTrackProvider>
          <GlobalStyle />
          <RootLayout>
            <SWRConfig value={{ fetcher }}>
              <Component {...pageProps} />
            </SWRConfig>
          </RootLayout>
        </SelectedTrackProvider>
      </SessionProvider>
    </>
  );
}
