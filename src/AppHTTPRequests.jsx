import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'components/Layout/Layout';

import HomePage from 'pages/HomePage';
import PostsPage from 'pages/PostsPage';
import SearchPostPage from 'pages/SearchPostPage';
import PostDetailsPage from 'pages/PostDetailsPage';

/*
Маршрутеризація складається з двух етапів:
1. Змінити адресну строку.
2. Підготувати маршрути з відповідними шляхами та компонентами(сторінками).

*/
export default function AppHTTPRequests() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        {/* /posts/1 */}
        <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
        <Route path="/search" element={<SearchPostPage />} />
      </Routes>
    </Layout>
  );
}

// export const StyledNavLink = styled(NavLink)`
//   display: inline-flex;
//   padding: 20px;
//   min-width: 100px;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid black;
//   background-color: transparent;
//   font-weight: 500;
//   border-radius: 7px;
//   color: inherit;
//   text-decoration: none;
//   transition: all 0.3s;
//   &.active {
//     background-color: black;
//     color: white;
//   }
// `;

// <StyledNavLink to="/">Home</StyledNavLink>;
