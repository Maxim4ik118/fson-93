import React from 'react';
import { Profile } from 'components/Profile/Profile';
import css from './FriendList.module.css';

const FriendList = ({
  friends,
  title = '',
  handlePrintProfileName,
  handleDeleteProfile,
  handleShowDetails,
}) => {
  return (
    <div className={css.list}>
      {/* {title.length > 0 && <h2>{title}</h2>} */}
      {title && <h2>{title}</h2>}
      {/* {Array.isArray(friends) && friends.map(friend => { */}
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

export { FriendList };
