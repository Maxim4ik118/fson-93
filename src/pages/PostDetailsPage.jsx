import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loader } from 'components/Loader/Loader';

import { STATUSES } from 'utils/constants';
import { requestPostDetailsById } from 'services/api';
import css from 'AppHTTPRequest.module.css';
import CommentsPage from './CommentsPage';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [status, setStatus] = useState(STATUSES.idle); // "idle" | "pending" | "success" | "error"
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setStatus(STATUSES.pending);
        const postData = await requestPostDetailsById(postId);
        setPostDetails(postData);
        setStatus(STATUSES.success);
      } catch (error) {
        setError(error.message);
        setStatus(STATUSES.error);
      }
    };

    fetchPosts();
  }, [postId]);

  return (
    <div>
      <h2>Post Details</h2>
      {status === STATUSES.pending && <Loader className={css.loader} />}
      {status === STATUSES.error && <ErrorMessage error={error} />}
      {status === STATUSES.success && (
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
        <Routes>
          <Route path="comments" element={<CommentsPage />}/>
        </Routes>
      </div>
    </div>
  );
};

export default PostDetailsPage;
