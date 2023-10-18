import React from "react";
import styles from "../../../../styles/profile.module.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const PasswordForm = () => {
  return (
    <>
      <Form className={styles.form}>
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
            />
          </FormGroup>
        </div>
        <Button outline className={styles.formSave}>Salvar Alterações</Button>
      </Form>
    </>
  );
};

export default PasswordForm;
