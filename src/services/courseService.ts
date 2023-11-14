import api from "./api";

export type EpisodeType = {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
};

export type CourseType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  episodes?: EpisodeType[];
};

const courseService = {
  getNewestCourses: async () => {
    const res = await api.get("/courses/newest").catch((error) => {
      return error.response;
    });
    return res;
  },

  getFeaturedCourses: async () => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .get("/courses/featured", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        return err.response;
      });
    return res;
  },

  favorite: async (courseId: number | string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .post(
        "/favorites",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  unfavorite: async (courseId: number | string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .delete(`/favorites/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  getFavCourses: async () => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .get("/favorites", { headers: { Authorization: `Bearer ${token}` } })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  like: async (courseId: number | string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .post(
        `/likes`,
        { courseId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  unlike: async (courseId: number | string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .delete(`/likes/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  getSearch: async (name: string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .get(`/courses/search?name=${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        return err.response;
      });

    return res;
  },

  getEpisodes: async (id: number | string) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .get(`/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .catch((err) => {
        return err.response;
      });

    return res;
  },
};

export default courseService;
