import "@/styles/coursePage.module.scss";

import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import Footer from "@/src/components/common/footer";

import courseService, { CourseType } from "@/src/services/courseService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const CoursePage = () => {
  const [course, setCourse] = useState<CourseType>();
  const router = useRouter();
  const { id } = router.query;

  const getCourse = async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      return res;
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <>
      <Head>
        <title>LucasFlix - {"nomeDoCurso"}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        <p>{course?.name}</p>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
