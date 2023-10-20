import api from "./api";

interface WatchTimeParams {
  episodeId: number;
  seconds: number;
}

const watchEpisodesService = {
  getWatchTime: async (episodeId: number) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .get(`/episodes/${episodeId}/watchTime`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        return err.response;
      });
    return res;
  },
  setWatchTime: async ({ episodeId, seconds }: WatchTimeParams) => {
    const token = sessionStorage.getItem("lucasflix-token");
    const res = await api
      .post(
        `/episodes/${episodeId}/watchTime`,
        { seconds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => {
        return err.response;
      });
    return res;
  },
};

export default watchEpisodesService;
