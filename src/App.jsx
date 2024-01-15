import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FriendList } from 'components/FriendList/FriendList';
import { AddProfileForm } from 'components/AddProfileForm/AddProfileForm';
import { Modal } from 'components/Modal/Modal';

/*
Як працювати з Редакс?

1. Встановити бібліотеки "redux" та "react-redux"
2. Створи "store", та підключити його до App через Provider
3. Створити редьюсер і продумати його "initalState"
4. Підключити редьюсер до "store" за допомогою "combineReducers"
5. Cпробувати отримати дані зі "store" в середині будь-якої компонети 
   за допомого "useSelector" - const friends = useSelector(store => store.friendsScope.friends)
6. Отримаємо логістичну фу-цію "dispatch" за допомогою "useDispatch"
7. Створити екшин(об`єкт інструкції) з відповідним "type" (не забути 
   про payload якщо він потрібен) і задіспатчити його - dispatch(action)
*/


export const App = () => {
  // const [friends, setFriends] = useState(
  //   JSON.parse(localStorage.getItem('friends')) ?? []
  // );
  // const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const friends = useSelector(store => store.friendsScope.friends);
  const filter = useSelector(store => store.friendsScope.filter);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleAddProfile = formData => {
    const hasDuplicates = friends.some(
      profile => profile.name === formData.name
    );
    if (hasDuplicates) {
      alert(`Profile with name ${formData.name} already exists!`);
      return;
    }

    const finalProfile = {
      ...formData,
      id: Math.random().toString(),
    };
    // setFriends(prevState => [...prevState, finalProfile]);
    const action = {
      type: "friends/addFriend",
      payload: finalProfile
    }
    dispatch(action);
  };

  const handlePrintProfileName = profileName => {
    console.log('profileName: ', profileName);
  };

  const handleDeleteProfile = profileId => {
    const action = {
      type: 'friends/removeFriend',
      payload: profileId
    }
    dispatch(action);
    // setFriends(friends.filter(friend => friend.id !== profileId));
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    const action = {
      type: 'friends/setFilter',
      payload: value
    }
    dispatch(action);
    // setFilter(value);
  };

  const handleShowDetails = profileId => {
    const selectedProfile = friends.find(friend => friend.id === profileId);
    setIsOpenModal(true);
    setModalData(selectedProfile);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const stringifiedFriends = JSON.stringify(friends);
    localStorage.setItem('friends', stringifiedFriends);
  }, [friends]);

  const filteredProfiles = useMemo(
    () =>
      friends.filter(profile =>
        profile.name.toLowerCase().includes(filter.trim().toLowerCase())
      ),
    [filter, friends]
  );

  const sortedFiltedProfiles = useMemo(
    () => [...filteredProfiles].sort((a, b) => b.isFavourite - a.isFavourite),
    [filteredProfiles]
  );

  return (
    <div>
      {filter.trim().toLowerCase() === 'christmas' && (
        <p>Congrats, you won a promocode for a 35% discount - #4RF2A2; 🎉</p>
      )}
      <AddProfileForm handleAddProfile={handleAddProfile} />
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
      <FriendList
        handlePrintProfileName={handlePrintProfileName}
        handleDeleteProfile={handleDeleteProfile}
        handleShowDetails={handleShowDetails}
        friends={sortedFiltedProfiles}
        title="Friends List"
      />

      {isOpenModal && (
        <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
