import React from "react";
import styles from "../styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";

const Register = () => {
  return (
    <>
      <Head>
        <title>LucasFlix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="LucasFlix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos de programação."
        />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
      </main>
    </>
  );
};

export default Register;
