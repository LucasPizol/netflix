import styles from "../../../../styles/slideCategory.module.scss";
import useSWR from "swr";
import React from "react";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";

const NewestCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses);

  if (error) return error;
  if (!data) return <p>Loading...</p>;

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default NewestCategory;
