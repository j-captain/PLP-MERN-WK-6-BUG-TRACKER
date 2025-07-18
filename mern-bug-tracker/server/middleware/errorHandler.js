module.exports = (err, req, res, next) => {
  console.error(`🔥 Error: ${err.message}`);
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Server error' : err.message;
  
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};