import React from 'react';
import { Profile } from 'components/Profile/Profile';
import css from './FriendList.module.css';
// import { useSelector } from 'react-redux';

export const FriendList = ({
  friends,
  title = '',
  handlePrintProfileName,
  handleDeleteProfile,
  handleShowDetails,
}) => {
  return (
    <div className={css.list}>
      {title && <h2>{title}</h2>}
      {friends?.map(friend => {
        return (
          <Profile
            key={friend.id}
            id={friend.id}
            name={friend.name}
            age={friend.age}
            isFavourite={friend.isFavourite}
            handlePrintProfileName={handlePrintProfileName}
            handleDeleteProfile={handleDeleteProfile}
            handleShowDetails={handleShowDetails}
          />
        );
      })}
    </div>
  );
};
