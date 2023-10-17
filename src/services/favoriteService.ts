import { Course, Favorite } from "../models";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    const favorite = await Favorite.create({
      courseId,
      userId,
    });

    return favorite;
  },

  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: {
        userId,
      },
      include: {
        association: "Course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
      userId,
      courses: favorites.map((favorite) => favorite.Course),
    };
  },

  delete: async (userId: number, courseId: number) => {
    await Favorite.destroy({
      where: {
        userId,
        courseId,
      },
    });
  },

  isFavorited: async (userId: number, courseId: number) => {
    const favorited = await Favorite.findOne({
      where: {
        courseId,
        userId,
      },
    });

    return favorited !== null;
  },
};
