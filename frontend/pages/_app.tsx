import type { AppProps } from "next/app";
import "../app/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
