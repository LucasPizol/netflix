import { Container } from "reactstrap";
import styles from "./styles.module.scss";

const CardSection = () => {
  return (
    <>
      <p className={styles.sectionTitle}>O QUE VOCÊ VAI ACESSAR</p>
      <Container className="d-flex flex-wrap justify-content-center gap-4 pb-5">
        <div className={styles.card1}>
          <p className={styles.cardTitle}>FRONT-END</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
        <div className={styles.card2}>
          <p className={styles.cardTitle}>BACK-END</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
        <div className={styles.card3}>
          <p className={styles.cardTitle}>MOBILE</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
        <div className={styles.card4}>
          <p className={styles.cardTitle}>GIT E GITHUB</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
        <div className={styles.card5}>
          <p className={styles.cardTitle}>PROJETOS</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
        <div className={styles.card6}>
          <p className={styles.cardTitle}>CARREIRA</p>
          <p className={styles.cardDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            consectetur neque, corrupti laboriosam inventore cumque maiores rem
            soluta est fuga cum? Alias perferendis totam rem ipsam ad hic magni
            explicabo.
          </p>
        </div>
      </Container>
    </>
  );
};

export default CardSection;
