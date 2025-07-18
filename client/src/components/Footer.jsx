import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} Bug Tracker - MERN Application
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px 0',
    marginTop: '40px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    textAlign: 'center',
  },
  text: {
    margin: 0,
    fontSize: '0.9rem',
  },
};

export default Footer;