// rafc -- react arrow function component

const Profile = ({ name, age, isFavourite = false }) => {
  return (
    <p>
      {/* {isFavourite ? '💖' : null} */}
      {isFavourite && '💖'} Hello, {name}. Your age is: {age}.
    </p>
  );
};

export { Profile };
