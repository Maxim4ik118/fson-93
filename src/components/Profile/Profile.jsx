// rafc -- react arrow function component
import cn from 'classnames';
import css from './Profile.module.css';

const Profile = ({
  name,
  age,
  id,
  isFavourite = false,
  className = '',
  handlePrintProfileName,
  handleDeleteProfile,
  handleShowDetails
}) => {
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
      <button onClick={() => handlePrintProfileName(name)}>Print Name</button>
      <button onClick={() => handleShowDetails(id)}>Show Details</button>
      <button onClick={() => handleDeleteProfile(id)}>&times;</button>
    </p>
  );
};

export { Profile };
