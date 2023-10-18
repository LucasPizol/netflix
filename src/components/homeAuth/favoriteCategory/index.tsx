import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import React from "react";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import { Container } from "reactstrap";
import PageSpinner from "../../common/spinner";

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourses);

  if (error) return error;
  if (!data) return <PageSpinner/>;

  return (
    <Container>
      <p className={styles.titleCategory}>MINHA LISTA</p>

      {data?.data?.courses.length >= 1 ? (
        <SlideComponent course={data.data.courses} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>Você nao tem nenhum curso na lista de favoritos</strong>
        </p>
      )}
    </Container>
  );
};

export default FavoriteCategory;
