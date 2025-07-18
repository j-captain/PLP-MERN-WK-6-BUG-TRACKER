import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bugService from '../services/bugService';
import ErrorBoundary from '../components/ErrorBoundary';

const BugFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    reporter: ''
  });

  useEffect(() => {
    if (id) {
      const fetchBug = async () => {
        try {
          const bug = await bugService.getBugById(id);
          setFormData({
            title: bug.title,
            description: bug.description,
            status: bug.status,
            priority: bug.priority,
            reporter: bug.reporter || ''
          });
        } catch (err) {
          setError(err.message || 'Failed to load bug data');
        }
      };
      fetchBug();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (id) {
        await bugService.updateBug(id, formData);
      } else {
        await bugService.createBug(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to submit bug report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        fontStyle: 'italic',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          color: '#2c3e50',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          {id ? 'Edit Bug Report' : 'Report New Bug'}
        </h1>
        
        {error && (
          <div 
            data-testid="error-message"
            style={{ 
              color: '#e74c3c',
              backgroundColor: '#fdecea',
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              fontSize: '0.95rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', color: '#34495e', fontSize: '0.95rem' }}>
              Title <span style={{ color: '#e74c3c', marginLeft: '4px' }}>*</span>
            </label>
            <input
              data-testid="input-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                padding: '12px 15px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              type="text"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', color: '#34495e', fontSize: '0.95rem' }}>
              Description <span style={{ color: '#e74c3c', marginLeft: '4px' }}>*</span>
            </label>
            <textarea
              data-testid="input-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                padding: '12px 15px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                fontSize: '1rem',
                minHeight: '100px',
                resize: 'vertical',
                transition: 'border-color 0.3s'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: '#34495e', fontSize: '0.95rem' }}>
                Status
              </label>
              <select
                aria-label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  padding: '12px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  backgroundColor: '#f8f9fa',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: '#34495e', fontSize: '0.95rem' }}>
                Priority
              </label>
              <select
                aria-label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  padding: '12px 15px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  backgroundColor: '#f8f9fa',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', color: '#34495e', fontSize: '0.95rem' }}>
              Reporter (optional)
            </label>
            <input
              data-testid="input-reporter"
              name="reporter"
              value={formData.reporter}
              onChange={handleChange}
              style={{
                padding: '12px 15px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                backgroundColor: '#f8f9fa',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              type="text"
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <button
              style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s',
                opacity: isSubmitting ? 0.7 : 1,
                pointerEvents: isSubmitting ? 'none' : 'auto'
              }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (id ? 'Update Bug' : 'Create Bug')}
            </button>
            
            <button
              style={{
                backgroundColor: '#e0e0e0',
                color: '#555',
                padding: '12px 30px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s'
              }}
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default BugFormPage;