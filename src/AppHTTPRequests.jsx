import React, { Component } from 'react';

import { Loader } from 'components/Loader/Loader';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { PostList } from 'components/PostList/PostList';

import { STATUSES } from 'utils/constants';

import { requestPosts } from 'services/api';

// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   },

export default class AppHTTPRequests extends Component {
  state = {
    posts: null,
    status: STATUSES.idle, // "idle" | "pending" | "success" | "error"
    error: null,
    searchTerm: '',
  };

  componentDidMount() {
    const fetchPosts = async () => {
      try {
        this.setState({ status: STATUSES.pending });
        const posts = await requestPosts();
        this.setState({ posts, status: STATUSES.success });
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      }
    };

    fetchPosts();
  }

  fetchPostsByQuery = async (searchTerm) => {
    try {
      this.setState({ status: STATUSES.pending });
      const posts = await requestPosts(); // requestPostsByQuery(searchTerm)
      this.setState({ posts, status: STATUSES.success });
    } catch (error) {
      this.setState({ error: error.message, status: STATUSES.error });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.searchTerm !== this.state.searchTerm || prevState.page !== this.state.page) {
      this.fetchPostsByQuery(this.state.searchTerm, this.state.page);
    }

  }

  handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.searchInput.value;

    this.setState({ searchTerm: searchValue });
  };

  handleLoadMore = () => {
    console.log('HELLO FROM METHOD handleLoadMore')
  }

  render() {
    const showPosts =
      this.state.status === STATUSES.success && Array.isArray(this.state.posts);

    return (
      <div>
        <h1>Weekly Posts</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="searchInput" required />
          <button type="submit">Search</button>
        </form>
        {this.state.status === STATUSES.pending && <Loader />}
        {this.state.status === STATUSES.error && (
          <ErrorMessage error={this.state.error} />
        )}
        {showPosts && <PostList posts={this.state.posts} />}
      </div>
    );
  }
}
