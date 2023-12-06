import React from 'react';
import { Profile } from 'components/Profile/Profile';
import css from './FriendList.module.css';
/*
От Антон всем 09:16 PM
чи можна просто title && <h2>{title}<h2/>  ???
От Катерина Приймакова всем 09:16 PM
а можна {title && <h2>{title}</h2>}

*/

const FriendList = ({ friends, title = '' }) => {
  return (
    <div className={css.list}>
      {/* {title.length > 0 && <h2>{title}</h2>} */}
      {title && <h2>{title}</h2>}
      {/* {Array.isArray(friends) && friends.map(friend => { */}
      {friends?.map(friend => {
        return (
          <Profile
            key={friend.id}
            name={friend.name}
            age={friend.age}
            isFavourite={friend.isFavourite}
          />
        );
      })}
    </div>
  );
};

export { FriendList };
