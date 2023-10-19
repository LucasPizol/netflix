import styles from "@/styles/coursePage.module.scss";

import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";

import courseService, { CourseType } from "@/src/services/courseService";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button, Container } from "reactstrap";
import PageSpinner from "@/src/components/common/spinner";
import EpisodeList from "@/src/components/episodeList";
import Footer from "@/src/components/common/footer";

const CoursePage = () => {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const getCourse = async () => {
    if (typeof id !== "string") return;
    const res = await courseService.getEpisodes(id);
    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorite(res.data.favorited);
      return res;
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;

    if (liked) {
      await courseService.unlike(id);
      setLiked(false);
      return;
    }

    await courseService.like(id);
    setLiked(true);
  };
  const handleFavCourse = async () => {
    if (typeof id !== "string") return;

    if (favorite) {
      await courseService.unfavorite(id);
      setFavorite(false);
      return;
    }

    await courseService.favorite(id);
    setFavorite(true);
  };

  if (!course) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>LucasFlix - {"nomeDoCurso"}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #0000009a,  #151515 90%), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0}
          >
            ASSISTIR AGORA
            <img
              src="/buttonPlay.svg"
              alt="buttonImg"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked ? (
              <img
                src="/course/iconLiked.svg"
                alt="likeImage"
                className={styles.interactionsImage}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLike.svg"
                alt="likeImage"
                className={styles.interactionsImage}
                onClick={handleLikeCourse}
              />
            )}
            {favorite ? (
              <img
                src="/course/iconFavorited.svg"
                alt="likeImage"
                className={styles.interactionsImage}
                onClick={handleFavCourse}
              />
            ) : (
              <img
                src="/course/iconAddFav.svg"
                alt="likeImage"
                className={styles.interactionsImage}
                onClick={handleFavCourse}
              />
            )}
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLenght}>
            {course?.episodes?.length} episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>
                Ainda não temos episódios. Favorite para voltar aqui!
              </strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} />
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
