import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loader, PostList } from 'components';

import { requestPostDetailsById } from 'services/api';

const SearchPostPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const query = searchParams.get('sQuery');

  useEffect(() => {
    if (query === null) return;

    const fetchPostsByQuery = async () => {
      try {
        setIsLoading(true);
        const post = await requestPostDetailsById(query);

        setPosts([post]);
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsByQuery();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.searchInput.value;

    setSearchParams({
      sQuery: searchValue,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchInput" defaultValue={query} required />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}
      {posts !== null && posts?.length > 0 && <PostList posts={posts} />}
    </div>
  );
};

export default SearchPostPage;
