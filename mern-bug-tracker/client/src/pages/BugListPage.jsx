import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BugCard from '../components/BugCard';
import StatusFilter from '../components/StatusFilter';
import PriorityFilter from '../components/PriorityFilter';
import SearchBar from '../components/SearchBar';
import bugService from '../services/bugService';
import LoadingSpinner from '../components/LoadingSpinner';

const BugListPage = () => {
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const data = await bugService.getAllBugs();
        setBugs(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bugs. Please try again later.');
        setLoading(false);
        console.error('Error fetching bugs:', err);
      }
    };
    
    fetchBugs();
  }, []);

  useEffect(() => {
    let result = bugs;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(bug => bug.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(bug => bug.priority === priorityFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(bug => 
        bug.title.toLowerCase().includes(term) || 
        bug.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredBugs(result);
  }, [bugs, statusFilter, priorityFilter, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await bugService.deleteBug(id);
        setBugs(bugs.filter(bug => bug._id !== id));
      } catch (err) {
        console.error('Error deleting bug:', err);
        alert('Failed to delete bug. Please try again.');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bug Tracker</h1>
        <Link to="/add-bug" style={styles.addButton}>
          + Report New Bug
        </Link>
      </div>
      
      <div style={styles.filters}>
        <SearchBar onSearch={setSearchTerm} />
        <div style={styles.filterGroup}>
          <StatusFilter onFilterChange={setStatusFilter} />
          <PriorityFilter onFilterChange={setPriorityFilter} />
        </div>
      </div>
      
      {filteredBugs.length === 0 ? (
        <div style={styles.noBugs}>
          <h3>No bugs found</h3>
          <p>Try adjusting your filters or report a new bug.</p>
        </div>
      ) : (
        <div style={styles.bugGrid}>
          {filteredBugs.map(bug => (
            <BugCard 
              key={bug._id} 
              bug={bug} 
              onDelete={() => handleDelete(bug._id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    margin: 0,
  },
  addButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '30px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  filterGroup: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  bugGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  noBugs: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  error: {
    color: '#e74c3c',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fdeded',
    borderRadius: '8px',
    margin: '20px 0',
  },
};

export default BugListPage;