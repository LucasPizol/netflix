import Link from "next/link";
import styles from "./styles.module.scss";
import { CourseType } from "@/src/services/courseService";

interface props {
  course: CourseType;
}

const SlideCard = ({ course }: props) => {
  return (
    <>
      <Link href={`/course/${course.id}`} style={{ textDecoration: "none" }}>
        <div className={styles.slide}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl}`}
            alt={course.name}
            className={styles.slideImg}
          />
          <p className={styles.slideTitle}>{course.name}</p>
          <p className={styles.slideDescription}>{course.synopsis}</p>
        </div>
      </Link>
    </>
  );
};

export default SlideCard;
