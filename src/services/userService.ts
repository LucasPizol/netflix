import { User } from "../models";
import { UserCreationAttributes } from "../models/User";
import { EpisodeInstance } from "../models/Episode";

function filterLastEpisodesByCourse(episodes: EpisodeInstance[]) {
  const coursesOnList: number[] = [];
  const lastEpisodes = episodes.reduce((currentList, episode) => {
    if (!coursesOnList.includes(episode.courseId)) {
      coursesOnList.push(episode.courseId);
      currentList.push(episode);

      return currentList;
    }

    const episodeFromSameCourse = currentList.find(
      (ep) => ep.courseId == episode.courseId
    );

    if (episodeFromSameCourse!.order > episode.order) return currentList;

    const listWithoutEpisodeFromSameCourse = currentList.filter(
      (ep) => ep.courseId !== episode.courseId
    );

    listWithoutEpisodeFromSameCourse.push(episode);

    return listWithoutEpisodeFromSameCourse;
  }, [] as EpisodeInstance[]);

  return lastEpisodes;
}

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);

    return user;
  },

  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      phone: string;
      birth: Date;
      email: string;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedUsers[0];
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      {
        where: {
          id,
        },
        returning: true,
        individualHooks: true,
      }
    );

    return updatedUsers[0];
  },

  show: async (id: number) => {
    const user = await User.findOne({ where: { id } });

    return user;
  },

  getKeepWatchingList: async (id: number) => {
    const userWithWatchingEpisodes = await User.findByPk(id, {
      include: {
        association: "Episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        include: [
          {
            association: "Course",
            as: "course",
            attributes: [
              "id",
              "name",
              "synopsis",
              ["thumbnail_url", "thumbnailUrl"],
            ],
          },
        ],
        through: {
          as: "watchTime",
          attributes: ["seconds", ["updated_at", "updatedAt"]],
        },
      },
    });
    if (!userWithWatchingEpisodes) throw new Error("Usuário não encontrado.");

    const getKeepWatchingList = filterLastEpisodesByCourse(
      userWithWatchingEpisodes.Episodes!
    );

    getKeepWatchingList.sort((a, b) =>
      //@ts-ignore
      a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1
    );

    return getKeepWatchingList;
  },
};
