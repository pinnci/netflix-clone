import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="root-popups" />
        <div id="root-modals" />
      </body>
    </Html>
  );
}
