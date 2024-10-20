import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title> 这是一个有趣的网站 </title>
      <Head>
        <meta
          name="keywords"
          content="关键词1， 关键词2， 关键词3"
        />
        <meta name="description" content="这是一段描述" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
