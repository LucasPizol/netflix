import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";

const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>LucasFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="LucasFlix" key="title" />
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação."/>
      </Head>
      <main>
        <HeaderNoAuth/>
      </main>
    </>
  );
};

export default HomeNoAuth;
