import React from 'react';
import { useDispatch } from 'react-redux';

import { apiRegisterUser } from '../redux/auth/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.userName.value;
    const email = e.currentTarget.elements.userEmail.value;
    const password = e.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };

    dispatch(apiRegisterUser(formData));
  };

  return (
    <div>
      <h1>RegisterPage</h1>

      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="userName"
            placeholder="Kirito"
            minLength={2}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="userEmail"
            placeholder="kirito228@hotmail.ua"
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="userPassword"
            placeholder="**********"
            minLength={7}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
