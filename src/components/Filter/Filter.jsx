import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../redux/friends/friendsSlice';
import { selectFriendsFilter } from '../../redux/friends/friendsSlice.selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFriendsFilter);
  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = setFilter(value);
    dispatch(action);
  };

  return (
    <div>
      <p>Find Profile:</p>
      <input
        value={filter}
        onChange={handleChangeFilter}
        type="text"
        name="keyword"
        placeholder="Ivan..."
      />
    </div>
  );
};

export default Filter;
