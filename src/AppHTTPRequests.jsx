import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout, Loader } from 'components';

import css from 'AppHTTPRequest.module.css';

const HomePage = lazy(() => import('pages/HomePage'));
const PostsPage = lazy(() => import('pages/PostsPage'));
const SearchPostPage = lazy(() => import('pages/SearchPostPage'));
const PostDetailsPage = lazy(() => import('pages/PostDetailsPage'));

/*
Маршрутеризація складається з двух етапів:
1. Змінити адресну строку. (Link, NavLink)
2. Підготувати маршрути з відповідними шляхами та компонентами(сторінками). (Route)

*/
export default function AppHTTPRequests() {
  return (
    <Layout>
      <Suspense fallback={<Loader className={css.loader} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postId/*" element={<PostDetailsPage />} />
          <Route path="/search" element={<SearchPostPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
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
