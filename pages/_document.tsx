import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Poppins:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="preload"
            href="/fonts/CovesBold.otf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
