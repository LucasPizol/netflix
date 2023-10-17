import { Container } from "reactstrap";
import styles from "./style.module.scss";

const Footer = () => {
  return (
    <>
      <Container className={styles.footer}>
        <img src="/logoOnebitcode.svg" alt="Logo Onebitcode" className={styles.footerLogo} />
        <a
          href="https://lucaspizol.github.io/Site-Portfolio/"
          target="__blank"
          className={styles.footerLink}
        >
          Lucas Pizol
        </a>
      </Container>
    </>
  );
};

export default Footer;
