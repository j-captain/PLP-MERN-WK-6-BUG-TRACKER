import React from 'react';
import { Link } from 'react-router-dom';

const BugCard = ({ bug, onDelete }) => {
  const statusColors = {
    open: '#3498db',
    'in-progress': '#f39c12',
    resolved: '#2ecc71',
  };

  const priorityColors = {
    low: '#27ae60',
    medium: '#f39c12',
    high: '#e74c3c',
    critical: '#c0392b',
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>{bug.title}</h3>
        <div style={styles.badgeGroup}>
          <span 
            style={{
              ...styles.badge,
              backgroundColor: statusColors[bug.status] || '#95a5a6',
            }}
          >
            {bug.status.charAt(0).toUpperCase() + bug.status.slice(1)}
          </span>
          <span 
            style={{
              ...styles.badge,
              backgroundColor: priorityColors[bug.priority] || '#95a5a6',
            }}
          >
            {bug.priority.charAt(0).toUpperCase() + bug.priority.slice(1)}
          </span>
        </div>
      </div>
      <p style={styles.description}>{bug.description}</p>
      <div style={styles.cardFooter}>
        <div style={styles.meta}>
          <span style={styles.metaItem}>Reported by: {bug.reporter || 'Anonymous'}</span>
          <span style={styles.metaItem}>
            {new Date(bug.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div style={styles.actions}>
          <Link to={`/edit-bug/${bug._id}`} style={styles.editButton}>
            Edit
          </Link>
          <button 
            onClick={() => onDelete(bug._id)} 
            style={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    padding: '20px',
    transition: 'transform 0.3s, box-shadow 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50',
  },
  badgeGroup: {
    display: 'flex',
    gap: '8px',
  },
  badge: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'white',
    textTransform: 'capitalize',
  },
  description: {
    color: '#7f8c8d',
    margin: '0 0 15px 0',
    fontSize: '0.95rem',
    lineHeight: '1.5',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  metaItem: {
    fontSize: '0.8rem',
    color: '#95a5a6',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
  deleteButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b',
    },
  },
};

export default BugCard;