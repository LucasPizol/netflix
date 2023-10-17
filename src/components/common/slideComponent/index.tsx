import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { CourseType } from "@/src/services/courseService";
import SlideCard from "../slideCard";

interface props {
  course: CourseType[];
}

const SlideComponent = ({ course }: props) => {
  return (
    <>
      <div>
        <Splide
          options={{
            type: "loop",
            perPage: 4,
            perMove: 1,
            pagination: false,
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
