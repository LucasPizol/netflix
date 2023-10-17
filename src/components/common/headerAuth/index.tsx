import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { useState } from "react";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

const HeaderAuth = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();

    router.push("/");
  };

  return (
    <div>
      <Container className={styles.nav}>
        <Link href={""}>
          <img
            src="/logoOnebitflix.svg"
            alt="logoOnebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <Form>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
            ></Input>
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupaHeader"
            className={styles.searchImg}
          />
          <div className={styles.userProfileDiv}>
            <p className={styles.userProfile} onClick={handleChangeModal}>
              AB
            </p>
            <div className={isModalOpen ? styles.modalShowed : styles.modal}>
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <p className={styles.modalLink}>Meus Dados</p>
              </Link>
              <p className={styles.modalLink} onClick={handleLogout}>
                Sair
              </p>
            </div>
          </div>
        </div>
      </Container>
      {isModalOpen ? <div className={styles.overlayModal} onClick={isModalOpen ? () => handleChangeModal() : () => {}}></div> : null}
    </div>
  );
};

export default HeaderAuth;
