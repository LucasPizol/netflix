import styles from "../styles/registerLogin.module.scss";
import { useState, useEffect, FormEvent } from "react";
import Head from "next/head";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/src/components/common/footer";
import { useRouter } from "next/router";
import ToastComponent from "@/src/components/common/toast";
import authService from "@/src/services/authService";

const Login = () => {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<string>("");

  useEffect(() => {
    if (sessionStorage.getItem("lucasflix-token")) {
      router.push("/home");
    }
  });

  useEffect(() => {
    const registerSuccess = router.query.registered;

    if (registerSuccess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      setToastMessage("Cadastro feito com sucesso");
    }
  }, [router.query]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 1000 * 3);

      setToastMessage("Email ou senha incorretos");
    }
  };

  return (
    <>
      <Head>
        <title>LucasFlix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte"
        />
        <Container className="py-5 flex-fill">
          <p className={styles.formTitle}>Bem vindo(a) de volta!</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Bem vindo(a) ao LucasFlix</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
        </Container>
        <Footer />
        <ToastComponent
          color={toastColor}
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default Login;
