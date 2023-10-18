import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import profileService, { UserParams } from "@/src/services/profileService";

Modal.setAppElement("#__next");

const HeaderAuth = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [initials, setInitials] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  const handleChangeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`search?name=${searchName}`);
    setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`search?name=${searchName}`);
    setSearchName("");
  };

  useEffect(() => {
    profileService.fetchCurrent().then((user: UserParams) => {
      const firstNameInit = user.firstName.slice(0, 1);
      const lastNameInit = user.lastName.slice(0, 1);

      setInitials(firstNameInit + lastNameInit);
    });
  }, []);

  return (
    <div style={{ backgroundColor: "#000" }}>
      <Container className={styles.nav}>
        <Link href={"/home"}>
          <img
            src="/logoOnebitflix.svg"
            alt="logoOnebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={(e) => handleSearch(e)}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchName}
              onChange={(e) =>
                setSearchName(e.currentTarget.value.toLowerCase())
              }
            ></Input>
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupaHeader"
            className={styles.searchImg}
            onClick={handleSearchClick}
          />
          <div className={styles.userProfileDiv}>
            <p className={styles.userProfile} onClick={handleChangeModal}>
              {initials}
            </p>
            <div className={isModalOpen ? styles.modalShowed : styles.modal}>
              <Link href="/profile" style={{ textDecoration: "none" }}>
                <p className={styles.modalLink}>Meus Dados</p>
              </Link>
              <p className={styles.modalLinkLeave} onClick={handleLogout}>
                Sair
              </p>
            </div>
          </div>
        </div>
      </Container>
      {isModalOpen ? (
        <div
          className={styles.overlayModal}
          onClick={isModalOpen ? () => handleChangeModal() : () => {}}
        ></div>
      ) : null}
    </div>
  );
};

export default HeaderAuth;
