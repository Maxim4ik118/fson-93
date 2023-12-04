import { Profile } from './Profile';

const friendsData = [
  { id: '1', name: 'Max', age: 21, isFavourite: true },
  { id: '2', name: 'Oleg', age: 30, isFavourite: false },
  { id: '3', name: 'Kateryna', age: 23, isFavourite: false },
  { id: '4', name: 'Antoniy', age: 19, isFavourite: true },
];

export const App = () => {
  return (
    <div>
      <h1>Friends book</h1>
      {friendsData.map(friend => {
        return (
          <Profile
            key={friend.id}
            name={friend.name}
            age={friend.age}
            isFavourite={friend.isFavourite}
          />
        );
      })}
      {/* <Profile name="Max" age={21} isFavourite={true} />
      <Profile name="Oleg" age={30} />
      <Profile name="Kateryna" age={25} />
      <Profile name="Antoniy" age={19} isFavourite={true} /> */}
    </div>
  );
};
