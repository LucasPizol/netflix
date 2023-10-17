import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import courseService, { CourseType } from "@/src/services/courseService";
import { GetStaticProps } from "next";
import { ReactNode } from "react";
import Footer from "@/src/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>LucasFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="LucasFlix" key="title" />
        <meta
          name="description"
          content="Tenha acesso aos melhores conteúdos de programação."
        />
      </Head>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardSection />
        </div>


        <div data-aos="fade-up" data-aos-duration="1350">
        <SlideSection
          newestCourses={course}
          data-aos="fade-up"
          data-aos-duration="1350"
        />

        </div>
        
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourses();
  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomeNoAuth;
