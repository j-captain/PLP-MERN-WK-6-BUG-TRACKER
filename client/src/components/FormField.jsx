import React from 'react';

const FormField = ({ label, name, value, onChange, type = 'text', required = false, maxLength }) => {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>
        {label}
        {required && <span style={styles.required}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          style={styles.textarea}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          style={styles.input}
        />
      )}
      {maxLength && (
        <div style={styles.charCount}>
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

const styles = {
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
    fontSize: '0.95rem',
  },
  required: {
    color: '#e74c3c',
    marginLeft: '4px',
  },
  input: {
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
  textarea: {
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
    },
  },
  charCount: {
    fontSize: '0.8rem',
    color: '#95a5a6',
    textAlign: 'right',
  },
};

export default FormField;