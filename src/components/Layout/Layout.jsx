import React from 'react';
import { useSelector } from 'react-redux';

import { Navigation, UserMenu } from 'components';

import { selectAuthIsLoggedIn } from '../../redux/auth/authSlice.selectors';

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn)

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <Navigation />
        {isLoggedIn && <UserMenu />}
      </header>

      <main>{children}</main>
      <footer>Copyright</footer>
    </div>
  );
};
