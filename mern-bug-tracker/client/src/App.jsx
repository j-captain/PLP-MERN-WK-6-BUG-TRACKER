import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BugListPage from './pages/BugListPage';
import BugFormPage from './pages/BugFormPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <main style={styles.main}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<BugListPage />} />
              <Route path="/add-bug" element={<BugFormPage />} />
              <Route path="/edit-bug/:id" element={<BugFormPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  main: {
    flex: 1,
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
};

export default App;