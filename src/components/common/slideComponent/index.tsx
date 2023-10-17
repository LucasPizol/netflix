import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { CourseType } from "@/src/services/courseService";
import SlideCard from "../slideCard";

interface props {
  course: CourseType[];
}

const SlideComponent = ({ course }: props) => {
  let slideCount = 0;

  if (course.length > 4) {
    slideCount = 4;
  } else if (course) {
    slideCount = course.length;
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center py-4">
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            pagination: false,
            arrows: course.length > 4,
            drag: course.length > 4,
            width: 300 * slideCount,
            breakpoints: {
              1200: {
                perPage: slideCount >= 2 ? 2 : slideCount,
                width: slideCount >= 2 ? 600 : 300,
                arrows: course.length > 2,
                drag: course.length > 2,
              },
              600: {
                perPage: 1,
                width: 300,
                arrows: course.length > 1,
                drag: course.length > 1,
              },
              300: {
                width: 250,
              },
            },
          }}
        >
          {course?.map((course) => (
            <SplideSlide key={course.id}>
              <SlideCard course={course} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default SlideComponent;
