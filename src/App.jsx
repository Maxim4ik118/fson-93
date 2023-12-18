import { Component } from 'react';

import { FriendList } from 'components/FriendList/FriendList';
import { AddProfileForm } from 'components/AddProfileForm/AddProfileForm';
import { Modal } from 'components/Modal/Modal';

const friendsData = [
  { id: '1', name: 'Max', age: 21, isFavourite: false },
  { id: '2', name: 'Oleg', age: 30, isFavourite: true },
  { id: '3', name: 'Kateryna', age: 23, isFavourite: true },
  { id: '4', name: 'Antoniy', age: 19, isFavourite: false },
];

export class App extends Component {
  state = {
    friends: friendsData,
    filter: '',
    isOpenModal: false,
    modalData: null,
  };

  handleClick = e => {
    this.setState({ counter: this.state.counter + 1 });

    // this.setState((prevState) => {
    //   return {
    //     counter: prevState.counter + 1
    //   }
    // })
  };

  handleAddProfile = formData => {
    // { name: "Andrew", age: 32, isFavourite: true }
    const hasDuplicates = this.state.friends.some(
      profile => profile.name === formData.name
    );
    if (hasDuplicates) {
      alert(`Profile with name ${formData.name} already exists!`);
      return;
    }

    const finalProfile = {
      ...formData,
      id: Math.random().toString(),
    }; // { id: "0.23123", name: "Andrew", age: 32, isFavourite: true }

    this.setState(prevState => {
      return {
        friends: [...prevState.friends, finalProfile],
      };
    });
  };

  handlePrintProfileName = profileName => {
    console.log('profileName: ', profileName);
  };

  handleDeleteProfile = profileId => {
    this.setState({
      friends: this.state.friends.filter(friend => friend.id !== profileId),
    });
  };

  handleChangeFilter = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  handleShowDetails = profileId => {
    const selectedProfile = this.state.friends.find(
      friend => friend.id === profileId
    );
    this.setState({
      isOpenModal: true,
      modalData: selectedProfile,
    });
  };

  handleCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  componentDidMount() {
    const stringifiedFriends = localStorage.getItem('friends');
    const friends = JSON.parse(stringifiedFriends) ?? [];
    this.setState({ friends });
  }

  componentDidUpdate(prevProps, prevState) {
    // [{}, {}, {}, {}] !== [{}, {}, {}]
    if(prevState.friends !== this.state.friends) {
      const stringifiedFriends = JSON.stringify(this.state.friends);
      localStorage.setItem('friends', stringifiedFriends);
    }

    if (prevState.isOpenModal !== this.state.isOpenModal) {
      console.log('state isOpenModal has changed to ' + this.state.isOpenModal);
    }
  }

  render() {
    const filteredProfiles = this.state.friends.filter(profile =>
      profile.name
        .toLowerCase()
        .includes(this.state.filter.trim().toLowerCase())
    );

    const sortedFiltedProfiles = [...filteredProfiles].sort(
      (a, b) => b.isFavourite - a.isFavourite
    );
    return (
      <div>
        {this.state.filter.trim().toLowerCase() === 'christmas' && (
          <p>Congrats, you won a promocode for a 35% discount - #4RF2A2; 🎉</p>
        )}
        <AddProfileForm handleAddProfile={this.handleAddProfile} />
        <div>
          <p>Find Profile:</p>
          <input
            value={this.state.filter}
            onChange={this.handleChangeFilter}
            type="text"
            name="keyword"
            placeholder="Ivan..."
          />
        </div>
        <FriendList
          handlePrintProfileName={this.handlePrintProfileName}
          handleDeleteProfile={this.handleDeleteProfile}
          handleShowDetails={this.handleShowDetails}
          friends={sortedFiltedProfiles}
          title="Friends List"
        />

        {this.state.isOpenModal && (
          <Modal
            modalData={this.state.modalData}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
