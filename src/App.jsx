import { useEffect, useMemo, useState } from 'react';

import { FriendList } from 'components/FriendList/FriendList';
import { AddProfileForm } from 'components/AddProfileForm/AddProfileForm';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem('friends')) ?? []
  );
  const [filter, setFilter] = useState('');
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

    // this.setState(prevState => {
    //   return {
    //     friends: [...prevState.friends, finalProfile],
    //   };
    // });
    setFriends(prevState => [...prevState, finalProfile]);
  };

  const handlePrintProfileName = profileName => {
    console.log('profileName: ', profileName);
  };

  const handleDeleteProfile = profileId => {
    // this.setState({
    //   friends: this.state.friends.filter(friend => friend.id !== profileId),
    // });
    setFriends(friends.filter(friend => friend.id !== profileId));
  };

  const handleChangeFilter = event => {
    const value = event.target.value;
    // this.setState({ filter: value });
    setFilter(value);
  };

  const handleShowDetails = profileId => {
    const selectedProfile = friends.find(friend => friend.id === profileId);
    // this.setState({
    //   isOpenModal: true,
    //   modalData: selectedProfile,
    // });
    setIsOpenModal(true);
    setModalData(selectedProfile);
  };

  const handleCloseModal = () => {
    // this.setState({ isOpenModal: false });
    setIsOpenModal(false);
  };

  useEffect(() => {
    const stringifiedFriends = JSON.stringify(friends);
    localStorage.setItem('friends', stringifiedFriends);
  }, [friends]);

  useEffect(() => {
    console.log('state isOpenModal has changed to ' + isOpenModal);
  }, [isOpenModal]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.friends !== this.state.friends) {
  //     const stringifiedFriends = JSON.stringify(this.state.friends);
  //     localStorage.setItem('friends', stringifiedFriends);
  //   }

  //   if (prevState.isOpenModal !== this.state.isOpenModal) {
  //     console.log('state isOpenModal has changed to ' + this.state.isOpenModal);
  //   }
  // }

  const filteredProfiles = useMemo(() => friends.filter(profile =>
    profile.name.toLowerCase().includes(filter.trim().toLowerCase())
  ), [filter, friends]);

  const sortedFiltedProfiles = useMemo(() => [...filteredProfiles].sort(
    (a, b) => b.isFavourite - a.isFavourite
  ), [filteredProfiles]);
  
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
