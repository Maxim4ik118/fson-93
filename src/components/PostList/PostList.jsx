import React from 'react';

import css from '../../AppHTTPRequest.module.css';
import { Link } from 'react-router-dom';

export const PostList = ({ posts, visiblePosts }) => {
  return (
    <div>
      {Array.isArray(posts) && posts.length === 0 && (
        <p>You still don't have any posts!</p>
      )}
      <ul className={css.postList}>
        {Array.isArray(posts) &&
          posts.slice(0, visiblePosts).map(post => {
            return (
              <li key={post.id} className={css.postListItem}>
                <Link to={`/posts/${post.id}`}>
                {/* <Link to={`/posts/5`}> */}
                  <h2 className={css.itemTitle}>Title: {post.title}</h2>
                  <p className={css.itemId}>Post Id: {post.id}</p>
                  <p className={css.itemBody}>Body: {post.body}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
