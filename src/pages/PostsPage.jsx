import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loader } from 'components/Loader/Loader';
import { PostList } from 'components/PostList/PostList';
import React, { useEffect, useRef, useState } from 'react';
import { requestPosts } from 'services/api';
import { POSTS_PER_PAGE, STATUSES } from 'utils/constants';

import css from 'AppHTTPRequest.module.css';

const PostsPage = () => {
  const [posts, setPosts] = useState(null);
  const [status, setStatus] = useState(STATUSES.idle); // "idle" | "pending" | "success" | "error"
  const [error, setError] = useState(null);
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

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showPosts = status === STATUSES.success && Array.isArray(posts);
  const visiblePosts = POSTS_PER_PAGE * page;

  return (
    <div>
      {status === STATUSES.pending && <Loader className={css.loader} />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {showPosts && <PostList posts={posts} visiblePosts={visiblePosts} />}
      <button ref={loadMoreRef} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default PostsPage;
