import { Component } from 'react';
import { FriendList } from './components/FriendList/FriendList';

const friendsData = [
  { id: '1', name: 'Max', age: 21, isFavourite: false },
  { id: '2', name: 'Oleg', age: 30, isFavourite: true },
  { id: '3', name: 'Kateryna', age: 23, isFavourite: true },
  { id: '4', name: 'Antoniy', age: 19, isFavourite: false },
];

// const btn = document.createElement('button');
// btn.onclick = (event) => console.log('hello')

export class App extends Component {
  state = {
    counter1: 1,
    counter2: 4,
    friends: friendsData,
  };

  handleClick = e => {
    //  this.state.counter++ ❌
    this.setState({ counter: this.state.counter + 1 });
    // { counter: 0, ...{ counter: 1 } }
    // { counter: 0, counter: 1 } -> { counter: 1 }

    // this.setState((prevState) => {
    //   return {
    //     counter: prevState.counter + 1
    //   }
    // })
  };

  handlePrintProfileName = profileName => {
    console.log('profileName: ', profileName);
  };

  handleDeleteProfile = profileId => {
    this.setState({
      friends: this.state.friends.filter(friend => friend.id !== profileId),
    });
  };

  render() {
    const total = this.state.counter1 + this.state.counter2;

    return (
      <div>
        {/* <h1>Friends book</h1> */}
        <p>{this.state.counter}</p>
        {total}
        {/* {showPromocode && (
          <p>Congrats! You won a promocode: #fe423 for a 20% discount!</p>
        )} */}
        <button onClick={this.handleClick}>Click me</button>
        <FriendList
          handlePrintProfileName={this.handlePrintProfileName}
          handleDeleteProfile={this.handleDeleteProfile}
          friends={this.state.friends}
          title="Friends List"
        />
      </div>
    );
  }
}
