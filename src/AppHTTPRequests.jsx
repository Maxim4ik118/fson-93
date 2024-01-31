import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Layout, Loader, PrivateRoute, RestrictedRoute } from 'components';

import { apiRefreshUser } from './redux/auth/authSlice';

import css from 'AppHTTPRequest.module.css';

const HomePage = lazy(() => import('pages/HomePage'));
const PostsPage = lazy(() => import('pages/PostsPage'));
const SearchPostPage = lazy(() => import('pages/SearchPostPage'));
const PostDetailsPage = lazy(() => import('pages/PostDetailsPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

export default function AppHTTPRequests() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader className={css.loader} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute>
                <RegisterPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/:postId/*"
            element={
              <PrivateRoute>
                <PostDetailsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPostPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
