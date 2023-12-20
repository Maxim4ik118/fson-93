import axios from "axios";

export const requestPosts = async () => {
    // https://jsonplaceholder.typicode.com/posts
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return data;
}


export const requestPostsByQuery = async (searchTerm) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`)
    return data;
}