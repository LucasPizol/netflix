import { useState, useEffect, FormEvent } from "react";
import styles from "../../../../styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import profileService, { UserParams } from "@/src/services/profileService";
import ToastComponent from "../../common/toast";
import { useRouter } from "next/router";

const defaultParams = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  created_at: "",
};

const UserForm = () => {
  const router = useRouter();
  const [color, setColor] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [params, setParams] = useState<UserParams>(defaultParams);
  const [initialEmail, setInitialEmail] = useState<string>("");

  const date = new Date(params.created_at);
  const month = date.toLocaleDateString("default", {
    month: "long",
  });

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setParams({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        created_at: user.createdAt,
      });

      setInitialEmail(user.email);
    });
  }, []);

  const handleChangeFields = (e: any) => {
    setParams({ ...params, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleUserUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await profileService.userUpdate(params);

    if (res === 200) {
      setIsToastOpen(true);
      setErrorMessage("Informações alteradas com sucesso");
      setColor("bg-success");
      setTimeout(() => setIsToastOpen(false), 1000 * 3);
      if (params.email !== initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }

      return;
    }

    setIsToastOpen(true);
    setErrorMessage("Você não pode mudar para este e-mail");
    setColor("bg-danger");
    setTimeout(() => setIsToastOpen(false), 1000 * 3);
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.headerForm}>
          <div className={styles.formName}>
            <p className={styles.nameAbbreviation}>{`${params.firstName.slice(
              0,
              1
            )}${params.lastName.slice(0, 1)}`}</p>
            <p
              className={styles.userName}
            >{`${params.firstName} ${params.lastName}`}</p>
          </div>
          <div className={styles.memberTime}>
            <img
              src="/profile/iconUserAccount.svg"
              className={styles.memberTimeImg}
            />
            <p className={styles.memberTimeText}>
              Membro desde
              <br />
              {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
            </p>
          </div>
        </div>

        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup className={styles.flexFormGroup}>
            <Label for="firstName" className={styles.label}>
              NOME
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Qual o seu nome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={params.firstName}
              onChange={handleChangeFields}
            />
          </FormGroup>
          <FormGroup className={styles.flexFormGroup}>
            <Label for="lastName" className={styles.label}>
              SOBRENOME
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Qual o seu sobrenome?"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={params.lastName}
              onChange={handleChangeFields}
            />
          </FormGroup>
        </div>
        <FormGroup className={styles.formGroup}>
          <Label for="phone" className={styles.label}>
            TELEFONE
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(xx) 9xxxx-xxxx"
            data-mask="[-]+55 (00) 00000-0000"
            required
            maxLength={20}
            className={styles.input}
            value={params.phone}
            onChange={handleChangeFields}
          />
        </FormGroup>
        <FormGroup className={styles.formGroup}>
          <Label for="email" className={styles.label}>
            EMAIL
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
            className={styles.input}
            value={params.email}
            onChange={handleChangeFields}
          />
        </FormGroup>

        <Button outline type="submit" className={styles.formSave}>
          Salvar alterações
        </Button>
      </Form>
      <ToastComponent
        color={color}
        isOpen={isToastOpen}
        message={errorMessage}
      />
    </>
  );
};

export default UserForm;
