import axios from "axios";
import { POSTS_API_URL, AUTHORS_API_URL, MEDIA_API_URL } from "./constants";

export const getAllPostsFromServer = async () => {
  // get all posts from the server
  try {
    const { data } = await axios.get(POSTS_API_URL);
    return data;
  } catch (e) {
    console.log(e);
  }
};

//fetch the author name
export const getAuthor = async (id: number) => {
  try {
    const {
      data: { name },
    } = await axios.get(`${AUTHORS_API_URL}/${id}`);
    return name;
  } catch (e) {
    console.log(e);
  }
};

export const getFeaturedImage = async (id: number) => {
  try {
    const res = await axios.get(`${MEDIA_API_URL}/${id}`);
    return res.data.guid.rendered;
  } catch (e) {
    console.log(e);
    return "";
  }
};
