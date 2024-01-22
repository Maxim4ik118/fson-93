import React, { useEffect, useRef } from 'react';

import { ErrorMessage, Loader, PostList } from 'components';

import { apiGetPosts, incrementPage } from '../redux/posts/postsSlice';
import { POSTS_PER_PAGE, STATUSES } from 'utils/constants';

import css from 'AppHTTPRequest.module.css';
import { useDispatch, useSelector } from 'react-redux';

const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const status = useSelector(state => state.posts.status);
  const error = useSelector(state => state.posts.error);
  const page = useSelector(state => state.posts.page);

  const loadMoreRef = useRef();

  useEffect(() => {
    dispatch(apiGetPosts());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  const showPosts = status === STATUSES.success && Array.isArray(posts);
  const visiblePosts = POSTS_PER_PAGE * page;

  const renderView = {
    [STATUSES.pending]: <Loader className={css.loader} />,
    [STATUSES.error]: <ErrorMessage error={error} />,
    [STATUSES.success]: showPosts && (
      <PostList posts={posts} visiblePosts={visiblePosts} />
    ),
  };

  return (
    <div>
      {renderView[status]}
      <button ref={loadMoreRef} onClick={handleLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default PostsPage;
