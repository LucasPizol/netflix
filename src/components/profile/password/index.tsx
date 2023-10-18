import React, { useState, useEffect, FormEvent } from "react";
import styles from "../../../../styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import profileService from "@/src/services/profileService";
import ToastComponent from "../../common/toast";

const defaultParams = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const PasswordForm = () => {
  const [color, setColor] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [params, setParams] = useState(defaultParams);

  const handleChangeFields = (e: any) => {
    setParams({ ...params, [e.currentTarget.name]: e.currentTarget.value });
  };

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setParams({
        currentPassword: "",    
        newPassword: "",
        confirmNewPassword: "",
      });
    });
  }, []);

  const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = params;

    if (newPassword !== confirmNewPassword) {
      setIsToastOpen(true);
      setErrorMessage("Senha e confirmação diferentes");
      setColor("bg-danger");
      setTimeout(() => setIsToastOpen(false), 1000 * 3);

      return;
    }

    if (currentPassword === newPassword) {
      setIsToastOpen(true);
      setErrorMessage("Você já está utilizando esta senha");
      setColor("bg-danger");
      setTimeout(() => setIsToastOpen(false), 1000 * 3);

      return;
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res === 204) {
      setIsToastOpen(true);
      setErrorMessage("Senha alterada com sucesso");
      setColor("bg-success");
      setTimeout(() => setIsToastOpen(false), 1000 * 3);
      setParams(defaultParams);
      return;
    }

    if (res === 400) {
      setIsToastOpen(true);
      setErrorMessage("Sua senha atual está incorreta!");
      setColor("bg-danger");
      setTimeout(() => setIsToastOpen(false), 1000 * 3);
    }
  };

  return (
    <>
      <Form className={styles.form} onSubmit={handlePasswordUpdate}>
        <FormGroup className={styles.formGroup}>
          <Label className={styles.label} for="currentPassword">
            SENHA ATUAL
          </Label>
          <Input
            name="currentPassword"
            type="password"
            id="currentPassword"
            placeholder="*******"
            required
            minLength={6}
            className={styles.input}
            value={params.currentPassword}
            onChange={handleChangeFields}
          />
        </FormGroup>

        <div className={styles.inputFlexDiv}>
          <FormGroup className={styles.flexFormGroup}>
            <Label className={styles.label} for="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="*******"
              required
              minLength={6}
              className={styles.input}
              value={params.newPassword}
              onChange={handleChangeFields}
            />
          </FormGroup>
          <FormGroup className={styles.flexFormGroup}>
            <Label className={styles.label} for="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="*******"
              required
              minLength={6}
              className={styles.input}
              value={params.confirmNewPassword}
              onChange={handleChangeFields}
            />
          </FormGroup>
        </div>
        <Button type="submit" outline className={styles.formSave}>
          Salvar Alterações
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

export default PasswordForm;
