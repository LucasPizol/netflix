import categoriesService, {
  CategoryType,
} from "@/src/services/categoriesService";
import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "../../common/spinner";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategoriesSlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/listCourses/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;
  if (!data) return <PageSpinner/>;

  return (
    <Container>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </Container>
  );
};

export default ListCategoriesSlide;
