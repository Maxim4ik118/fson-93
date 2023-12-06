// rafc -- react arrow function component
import cn from 'classnames';
import css from './Profile.module.css';

const Profile = ({ name, age, isFavourite = false, className = '' }) => {
  console.log(css);
  return (
    <p
      style={{
        backgroundColor: isFavourite ? 'blanchedalmond' : 'transparent',
      }}
      // className={css.friendProfile}
      // className={`${css.friendProfile} ${className}`}
      className={cn(css.friendProfile, className)}
    >
      {isFavourite && '💖'} Hello, <span className={css.accent}>{name}</span>.
      Your age is: {age}.
    </p>
  );
};

export { Profile };
