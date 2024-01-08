import React from 'react';
import { NavLink } from 'react-router-dom';

import css from 'AppHTTPRequest.module.css';

export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="/posts"
        >
          Posts
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${css.navLink} ${isActive ? css.active : ''}`
          }
          to="/search"
        >
          Search Post
        </NavLink>
        <span> |||||| </span>
        <a
          href="https://www.linkedin.com/in/maxim-simonchuk-8493b5190/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIN
        </a>
      </header>

      <main>{children}</main>
      <footer>Copyright</footer>
    </div>
  );
};
