import { Component } from 'react';
import { FriendList } from 'components/FriendList/FriendList';
import { AddProfileForm } from 'components/AddProfileForm/AddProfileForm';

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

  render() {
    // "Mama".includes("ma") -> true
    // "kapusta".includes("pust") -> true
    // "valik".includes("vat") -> false

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
          friends={sortedFiltedProfiles}
          title="Friends List"
        />
      </div>
    );
  }
}
