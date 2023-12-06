import { FriendList } from './FriendList/FriendList';
import { Profile } from './Profile/Profile';

const friendsData = [
  { id: '1', name: 'Max', age: 21, isFavourite: false },
  { id: '2', name: 'Oleg', age: 30, isFavourite: true },
  { id: '3', name: 'Kateryna', age: 23, isFavourite: true },
  { id: '4', name: 'Antoniy', age: 19, isFavourite: false },
];

export const App = () => {
  return (
    <div>
      <h1>Friends book</h1>
      <FriendList friends={friendsData} title="Friends List" />
 
    </div>
  );
};
