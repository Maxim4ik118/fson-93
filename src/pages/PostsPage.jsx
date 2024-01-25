import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage, Loader, PostList } from 'components';

import { apiGetPosts, incrementPage } from '../redux/posts/postsSlice';
import {
  selectPostDetailsError,
  selectPostDetailsPage,
  selectPostDetailsPosts,
  selectPostDetailsStatus,
} from 'redux/posts/postSlice.selectors';
import { POSTS_PER_PAGE, STATUSES } from 'utils/constants';

import css from 'AppHTTPRequest.module.css';

const PostsPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPostDetailsPosts);
  const status = useSelector(selectPostDetailsStatus);
  const error = useSelector(selectPostDetailsError);
  const page = useSelector(selectPostDetailsPage);

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
