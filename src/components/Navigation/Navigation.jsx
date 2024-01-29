import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';
import css from 'AppHTTPRequest.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <div>
      <NavLink
        className={({ isActive }) =>
          `${css.navLink} ${isActive ? css.active : ''}`
        }
        to="/"
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <>
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
          <NavLink
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.active : ''}`
            }
            to="/contacts"
          >
            Contacts
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.active : ''}`
            }
            to="/register"
          >
            Register
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${css.navLink} ${isActive ? css.active : ''}`
            }
            to="/login"
          >
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navigation;
