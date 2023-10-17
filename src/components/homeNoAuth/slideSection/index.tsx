import styles from "./styles.module.scss";
import { CourseType } from "@/src/services/courseService";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import SlideComponent from "../../common/slideComponent";

interface props {
  newestCourses: CourseType[];
}

const SlideSection = ({ newestCourses }: props) => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center py-5">
        <p className={styles.sectionTitle}>AULAS JÀ DISPONÍVEIS</p>
        <SlideComponent course={newestCourses} />
        <Link href="/">
          <Button outline color="light" className={styles.slideSectionBtn}>
            Se cadastre para acessar!
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default SlideSection;
