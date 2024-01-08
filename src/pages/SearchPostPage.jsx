import React, { useEffect, useState } from 'react';

const SearchPostPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm === '') return;

    const fetchPostsByQuery = async () => {
      try {
      } catch (error) {}
    };

    fetchPostsByQuery();
  }, [searchTerm]);

  const handleSubmit = e => {
    e.preventDefault();

    const searchValue = e.currentTarget.elements.searchInput.value;

    setSearchTerm(searchValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="searchInput" required />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPostPage;
