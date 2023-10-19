import Head from "next/head";
import styles from "../../../styles/episodePlayer.module.scss";
import { useRouter } from "next/router";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { useState, useEffect, useRef } from "react";
import courseService, { CourseType } from "@/src/services/courseService";
import watchEpisodesService from "@/src/services/episodeService";
import PageSpinner from "@/src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";
import ToastComponent from "@/src/components/common/toast";

const EpisodePlayer = () => {
  const router = useRouter();

  const [course, setCourse] = useState<CourseType>();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [getEpisodesTime, setGetEpisodesTime] = useState<number>(0);
  const [episodesTime, setEpisodesTime] = useState<number>(0);
  const [toastIsOpen, setToastIsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const episodeOrder = Number(router.query.id?.toString() || "");
  const episodeId = Number(router.query.episodeId?.toString() || "");
  const courseId = router.query.courseId?.toString() || "";

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res = await watchEpisodesService.getWatchTime(episodeId);

    if (!course?.episodes) return;

    if (
      Math.round(res.data.seconds) ===
      course.episodes[episodeOrder]?.secondsLong
    ) {
      if (res.data) setGetEpisodesTime(res.data.seconds);
    }

    if (res.data) {
      if (
        Math.round(res.data.seconds) ===
        course.episodes[episodeOrder]?.secondsLong
      ) {
        setGetEpisodesTime(0);
        return;
      }
      setGetEpisodesTime(res.data.seconds);
    }
  };

  const handleSetEpisodeTime = async (seconds: number) => {
    await watchEpisodesService.setWatchTime({
      episodeId,
      seconds: Math.round(seconds),
    });
  };

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router]);

  const handlePlayerTime = () => {
    playerRef.current?.seekTo(getEpisodesTime);
    setIsReady(true);
  };

  if (isReady) {
    setTimeout(() => {
      handleSetEpisodeTime(episodesTime);
    }, 1000 * 3);
  }

  const getCourse = async () => {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);
    if (res.status === 200) {
      setCourse(res.data);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (!course?.episodes) return <PageSpinner />;

  const handlePreviousEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder - 1}?courseId=${course?.id}&episodeId=${
        episodeId - 1
      }`
    );
  };

  const handleNextEpisode = () => {
    router.push(
      `/course/episode/${episodeOrder + 1}?courseId=${course?.id}&episodeId=${
        episodeId + 1
      }`
    );
  };

  if (episodeOrder + 1 < course?.episodes?.length) {
    if (
      Math.round(episodesTime) === course.episodes[episodeOrder].secondsLong
    ) {
      setTimeout(() => {
        handleNextEpisode();
      }, 1000 * 2);
    }
  }

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
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => {
                setEpisodesTime(progress.playedSeconds);
              }}
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
          <p className="text-center py-4">
            {course?.episodes[episodeOrder].synopsis}
          </p>
        </Container>
        <ToastComponent
          color="bg-success"
          isOpen={toastIsOpen}
          message={toastMessage}
        />
      </main>
    </>
  );
};

export default EpisodePlayer;
