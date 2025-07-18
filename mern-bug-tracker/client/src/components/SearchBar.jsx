import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search bugs..."
        value={searchTerm}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    },
  },
};

export default SearchBar;