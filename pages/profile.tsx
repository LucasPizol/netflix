import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/profile.module.scss";
import UserForm from "@/src/components/profile/user";
import HeaderAuth from "@/src/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import PasswordForm from "@/src/components/profile/password";
import { useRouter } from "next/router";
import PageSpinner from "@/src/components/common/spinner";

const UserInfo = () => {
  const [form, setForm] = useState<string>("user-form");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!sessionStorage.getItem("lucasflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <PageSpinner />;
  return (
    <>
      <Head>
        <title>LucasFlix - Meus dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <Container className="py-5">
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                onClick={() => {
                  setForm("user-form");
                }}
                style={
                  form === "user-form"
                    ? { borderColor: "#86e797", color: "#86e797" }
                    : {}
                }
              >
                DADOS PESSOAIS
              </Button>
              <Button
                className={styles.renderForm}
                onClick={() => {
                  setForm("password-form");
                }}
                style={
                  form !== "user-form"
                    ? { borderColor: "#86e797", color: "#86e797" }
                    : {}
                }
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "user-form" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default UserInfo;
