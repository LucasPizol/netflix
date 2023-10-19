import { CourseType, EpisodeType } from "@/src/services/courseService";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface props {
  episode: EpisodeType;
  course: CourseType;
}

const EpisodeList = ({ episode, course }: props) => {
  const router = useRouter();

  const handleSecondsToMin = () => {
    const minutes = Math.floor(episode.secondsLong / 60);

    const seconds = Math.floor(episode.secondsLong % 60);

    const toString = (num: number) => {
      return num.toString().padStart(2, "0");
    };

    const result = `${toString(minutes)}:${toString(seconds)}`;

    return result;
  };

  const handleEpisodePlayer = () => {
    router.push(`/course/episode/${episode.order - 1}?courseId=${course.id}`);
  };

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episódio nº {episode.order}</p>
          <p className={styles.episodeTime}>{handleSecondsToMin()}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>Episódio nº {episode.order}</p>
          <p className={styles.episodeDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et vitae
            cum at fuga ex quo numquam praesentium, laboriosam, doloremque
            maiores culpa accusamus a optio, ipsam laborum sint ad nihil iure.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Natus nihil odit neque eius hic soluta dolorem alias omnis
            perferendis. Minus ea culpa animi cum similique officiis delectus
            blanditiis aut laborum veniam esse error natus exercitationem neque
            sit illum odio, cumque doloribus porro. Est praesentium illum nihil,
            inventore necessitatibus voluptatem magnam!
          </p>
        </div>
      </div>
    </>
  );
};

export default EpisodeList;
