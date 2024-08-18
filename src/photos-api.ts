import axios from "axios";
import { Image } from "./App.types.js";

axios.defaults.baseURL = "https://api.unsplash.com";

interface FetchImagesByWordResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export const fetchPhotos = async (searchQuery: string, currentPage: number) => {
  const response = await axios.get(`/search/photos/`, {
    params: {
      query: searchQuery,
      per_page: 12,
      page: currentPage,
      client_id: "eLx6avcLOU7M_8krqPoNVY0zm5KlgWjMmPucoWQxpRM",
      orientation: "landscape",
    },
  });

  return response.data.results;
};
