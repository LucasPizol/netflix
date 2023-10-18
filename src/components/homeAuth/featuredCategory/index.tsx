import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import { Container } from "reactstrap";

const FeaturedCategory = () => {
  const { data, error } = useSWR(
    "/featuredCategory",
    courseService.getFeaturedCourses
  );

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <Container>
      <p className={styles.titleCategory}>EM DESTAQUE</p>

      {data?.data?.length >= 1 ? (
        <SlideComponent course={data.data} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>Você nao tem nenhum curso na lista de favoritos</strong>
        </p>
      )}
    </Container>
  );
};

export default FeaturedCategory;
