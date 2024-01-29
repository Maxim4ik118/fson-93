import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom';
import React, { Suspense, lazy, useEffect, useRef } from 'react';

import { ErrorMessage, Loader } from 'components';

import { STATUSES } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';

import { apiGetPostDetails } from '../redux/posts/postsSlice';

import {
  selectPostDetails,
  selectPostDetailsError,
  selectPostDetailsStatus,
} from '../redux/posts/postSlice.selectors';

import css from 'AppHTTPRequest.module.css';

// import CommentsPage from './CommentsPage';
const CommentsPage = lazy(() => import('./CommentsPage'));

const PostDetailsPage = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/posts');

  const postDetails = useSelector(selectPostDetails);
  const status = useSelector(selectPostDetailsStatus);
  const error = useSelector(selectPostDetailsError);

  useEffect(() => {
    dispatch(apiGetPostDetails(postId));
  }, [postId, dispatch]);

  return (
    <div>
      <h2>Post Details</h2>
      <Link to={backLinkRef.current}>Go back</Link>
      {status === STATUSES.pending && <Loader className={css.loader} />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {status === STATUSES.success && postDetails !== null && (
        <div>
          <h3>Title: {postDetails.title}</h3>
          <p>Body: {postDetails.body}</p>
        </div>
      )}

      <NavLink
        className={({ isActive }) =>
          `${css.navLink} ${isActive ? css.active : ''}`
        }
        to="comments"
      >
        Comments
      </NavLink>
      <div>
        <Suspense fallback={<Loader className={css.loader} />}>
          <Routes>
            <Route path="comments" element={<CommentsPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default PostDetailsPage;
