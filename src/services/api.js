import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const requestPosts = async () => {
  // https://jsonplaceholder.typicode.com/posts
  const { data } = await instance.get('/posts');
  return data;
};

export const requestPostDetailsById = async postId => {
  const { data } = await instance.get(`/posts/${postId}`);
  return data;
};

export const requestPostsByQuery = async searchTerm => {
  const { data } = await instance.get(`/posts?q=${searchTerm}`);
  return data;
};
