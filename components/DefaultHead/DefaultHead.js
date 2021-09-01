import Head from "next/head";

export default function DefaultHead({ pageDescription, pageTitle }) {
  return (
    <Head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={pageDescription} />
      <title>{pageTitle}</title>
    </Head>
  );
}
