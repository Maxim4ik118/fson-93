import { flushSync } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { PostList } from 'components/PostList/PostList';

import { POSTS_PER_PAGE, STATUSES } from 'utils/constants';

import { requestPosts } from 'services/api';

import css from './AppHTTPRequest.module.css';

export default function AppHTTPRequests() {
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState(STATUSES.idle); // "idle" | "pending" | "success" | "error"
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setStatus(STATUSES.pending);
        const posts = await requestPosts();
        setPosts(posts);
        setStatus(STATUSES.success);
      } catch (error) {
        setError(error.message);
        setStatus(STATUSES.error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm === '' && page === 1) return;

    const fetchPostsByQuery = async () => {
      try {
        setStatus(STATUSES.pending);
        const posts = await requestPosts(searchTerm, page); // requestPostsByQuery(searchTerm)
        flushSync(() => {
          setPosts(posts);
          setStatus(STATUSES.success);
        });
        loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        setError(error.message);
        setStatus(STATUSES.error);
      }
    };

    fetchPostsByQuery();
  }, [searchTerm, page]);


  const handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.searchInput.value;

    setSearchTerm(searchValue);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showPosts = status === STATUSES.success && Array.isArray(posts);
  const visiblePosts = POSTS_PER_PAGE * page;
  return (
    <div>
      <h1>Weekly Posts</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchInput" required />
        <button type="submit">Search</button>
      </form>
      {status === STATUSES.pending && <Loader className={css.loader} />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {showPosts && <PostList posts={posts} visiblePosts={visiblePosts} />}
      <button ref={loadMoreRef} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
}
