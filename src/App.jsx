import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddProfileForm, Filter, FriendList, Modal } from 'components';

import {
  addFriend,
  removeFriend,
} from './redux/friends/friendsSlice';
import { closeModal, openModal } from './redux/modal/modalSlice';
import {
  selectFilteredFriends,
  selectFriends,
} from './redux/friends/friendsSlice.selectors';
import {
  selectIsOpenModal,
  selectModalData,
} from './redux/modal/modalSlice.selectors';

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
  const dispatch = useDispatch();
  const friends = useSelector(selectFriends);
  const filteredProfiles = useSelector(selectFilteredFriends);
  const isOpenModal = useSelector(selectIsOpenModal);
  const modalData = useSelector(selectModalData);

  const handleAddProfile = formData => {
    const finalProfile = {
      ...formData,
      id: Math.random().toString(),
    };

    const action = addFriend(finalProfile);
    dispatch(action);
  };

  const handlePrintProfileName = profileName => {
    console.log('profileName: ', profileName);
  };

  const handleDeleteProfile = profileId => {
    const action = removeFriend(profileId);
    dispatch(action);
  };

  const handleShowDetails = profileId => {
    const selectedProfile = friends.find(friend => friend.id === profileId);
    dispatch(openModal(selectedProfile));
    // -> { type: '...' , payload: selectedProfile}
  };

  const handleCloseModal = () => {
    dispatch(closeModal()); // -> { type: '...' }
  };

  // const filteredProfiles = useMemo(
  //   () =>
  //     friends.filter(profile =>
  //       profile.name.toLowerCase().includes(filter.trim().toLowerCase())
  //     ),
  //   [filter, friends]
  // );

  const sortedFiltedProfiles = useMemo(
    () => [...filteredProfiles].sort((a, b) => b.isFavourite - a.isFavourite),
    [filteredProfiles]
  );

  return (
    <div>
      <AddProfileForm handleAddProfile={handleAddProfile} />
      <Filter />
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
