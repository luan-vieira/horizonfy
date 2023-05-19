import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    tokenApi: "",
    inputChange: "",
    artistId: "",
    albums: [],
    tracksAlbums: [],
    trackArtist: "",
    albumCliked: [],
    urlImageAlbum: "",
    linkAlbumSpotify: "",
  },
  getters: {},
  mutations: {
    storeToken(state, token) {
      state.tokenApi = token;
    },

    storeInputChange(state, inputChangeValue) {
      state.inputChange = inputChangeValue;
    },

    storeAlbumArtist(state, albumArtist) {
      state.albums = albumArtist;
      state.linkAlbumSpotify = albumArtist[0].external_urls.spotify;
    },

    storeTracksAlbum(state, tracksAlbum) {
      state.tracksAlbums = tracksAlbum;
      state.trackArtist = tracksAlbum[0].artists[0].name;
    },

    storeAlbumClicked(state, albumClick) {
      state.albumCliked = albumClick;
      state.urlImageAlbum = albumClick.images[0].url;
    },
  },
  actions: {
    async getToken({ commit }) {
      const clientId = import.meta.env.VITE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
      const encodedAuth = window.btoa(`${clientId}:${clientSecret}`);

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
        },
        {
          headers: {
            Authorization: `Basic ${encodedAuth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      commit("storeToken", response.data.access_token);
    },

    async getAlbumsArtist({ commit, state }, inputChangeValue) {
      const response = await axios.get(
        "https://api.spotify.com/v1/search?q=" +
          inputChangeValue.inputChange +
          "&type=artist",
        {
          headers: {
            Authorization: `Bearer ${state.tokenApi}`,
          },
        }
      );

      await axios
        .get(
          "https://api.spotify.com/v1/artists/" +
            response.data.artists.items[0].id +
            "/albums" +
            "?include_groups=album&market=US&limit=10",
          {
            headers: {
              Authorization: `Bearer ${state.tokenApi}`,
            },
          }
        )
        .then((response) => {
          commit("storeAlbumArtist", response.data.items);
        });
    },

    async getTracks({ commit, state }, album_id) {
      await axios
        .get(
          "https://api.spotify.com/v1/albums/" + album_id.album_id + "/tracks",
          {
            headers: {
              Authorization: `Bearer ${state.tokenApi}`,
            },
          }
        )
        .then((response) => {
          commit("storeTracksAlbum", response.data.items);
        });

      await axios
        .get(`https://api.spotify.com/v1/albums/${album_id.album_id}`, {
          headers: {
            Authorization: `Bearer ${state.tokenApi}`,
          },
        })
        .then((response) => {
          commit("storeAlbumClicked", response.data);
        });
    },
  },
  modules: {},
});
