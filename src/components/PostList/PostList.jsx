import React from 'react';

import css from '../../AppHTTPRequest.module.css';

export const PostList = ({ posts }) => {
  return (
    <div>
      {Array.isArray(posts) && posts.length === 0 && (
        <p>You still don't have any posts!</p>
      )}
      <ul className={css.postList}>
        {Array.isArray(posts) &&
          posts.map(post => {
            return (
              <li key={post.id} className={css.postListItem}>
                <h2 className={css.itemTitle}>Title: {post.title}</h2>
                <p className={css.itemId}>Post Id: {post.id}</p>
                <p className={css.itemBody}>Body: {post.body}</p>
              </li>
            );
          })}
      </ul>{' '}
    </div>
  );
};
