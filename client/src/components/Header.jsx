import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🐞 Bug Tracker
        </Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/add-bug" style={styles.navLink}>
            Report Bug
          </Link>
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '15px 0',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
    ':hover': {
      color: '#3498db',
    },
  },
};

export default Header;