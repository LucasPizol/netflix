import Head from "next/head";
import styles from "../../../styles/episodePlayer.module.scss";
import { useRouter } from "next/router";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { useState, useEffect } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

const EpisodePlayer = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();

  const episodeOrder = Number(router.query.id?.toString() || "");
  const courseId = router.query.courseId?.toString() || "";

  const getCourse = async () => {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    console.log(res);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  const handlePreviousEpisode = () => {
    router.push(`/course/episode/${episodeOrder - 1}?courseId=${course?.id}`);
  };

  const handleNextEpisode = () => {
    router.push(`/course/episode/${episodeOrder + 1}?courseId=${course?.id}`);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (!course?.episodes) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>LucasFlix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-3">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("lucasflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButtonDiv}>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder === 0}
              onClick={handlePreviousEpisode}
            >
              <img
                src="/episode/iconArrowLeft.svg"
                alt="setaEsquerda"
                className={styles.arrowImg}
              />
            </Button>
            <Button
              className={styles.episodeButton}
              disabled={episodeOrder + 1 === course.episodes.length}
              onClick={handleNextEpisode}

            >
              <img
                src="/episode/iconArrowRight.svg"
                alt="setaDireita"
                className={styles.arrowImg}
              />
            </Button>
          </div>
          <p className="text-center py-4">{course?.episodes[episodeOrder].synopsis}</p>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
