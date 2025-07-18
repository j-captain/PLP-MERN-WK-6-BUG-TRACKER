import React from 'react';

const StatusFilter = ({ onFilterChange }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>Filter by Status:</label>
      <select 
        onChange={(e) => onFilterChange(e.target.value)}
        style={styles.select}
        defaultValue="all"
      >
        <option value="all">All Statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
    fontSize: '0.95rem',
  },
  select: {
    padding: '10px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    },
  },
};

export default StatusFilter;