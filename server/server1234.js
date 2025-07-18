require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const Bug = require('./models/Bug');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// 🖼️ SERVER BANNER 
const displayBannerOne = () => {
  console.log('\x1b[38;2;255;158;125m%s\x1b[0m', `
  ███╗   ███╗███████╗██████╗ ███╗   ██╗    ██████╗ ██╗   ██╗ ██████╗ 
  ████╗ ████║██╔════╝██╔══██╗████╗  ██║    ██╔══██╗██║   ██║██╔════╝ 
  ██╔████╔██║█████╗  ██████╔╝██╔██╗ ██║    ██████╔╝██║   ██║██║  ███╗
  ██║╚██╔╝██║██╔══╝  ██╔══██╗██║╚██╗██║    ██╔══██╗██║   ██║██║   ██║
  ██║ ╚═╝ ██║███████╗██║  ██║██║ ╚████║    ██████╔╝╚██████╔╝╚██████╔╝
  ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝  ╚═════╝  ╚═════╝ 
  `);
  console.log();
};

// Banner 2
const displayBanner = () => {
  console.log('\n');
  console.log('\x1b[36m%s\x1b[0m', '✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
  console.log('\x1b[35m%s\x1b[0m', '   MERN Bug Tracker Server is starting...');
  console.log('\x1b[36m%s\x1b[0m', '✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
  console.log('\n');
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced logging middleware
app.use((req, res, next) => {
  console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/bugs', bugRoutes);

// Error handling middleware
app.use(errorHandler);

// Enhanced function to display bugs with full details
const displayBugs = async (count = 5, message = 'Recent Bugs') => {
  try {
    const bugs = await Bug.find({}).sort({ createdAt: -1 }).limit(count);
    if (bugs.length > 0) {
      console.log('\n');
      console.log('\x1b[45m%s\x1b[0m', ` 🐞🐞🐞 ${message} (${bugs.length}) 🐞🐞🐞 `);
      console.log('\x1b[34m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
      
      bugs.forEach((bug, index) => {
        const createdAt = new Date(bug.createdAt).toLocaleString();
        const updatedAt = new Date(bug.updatedAt).toLocaleString();
        
        console.log('\x1b[33m%s\x1b[0m', `       Bug #${index + 1} • Created: ${createdAt}`);
        console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${bug.title}`);
        console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${bug.reporter || 'Anonymous'}`);
        console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${bug.description}`);
        console.log('\x1b[32m%s\x1b[0m', ` 🏷️ Status:      ${bug.status}`);
        console.log('\x1b[33m%s\x1b[0m', ` 🔄 Updated At:  ${updatedAt}`);
        console.log('\x1b[34m%s\x1b[0m', '──────────────────────────────────────────────────────────────────────────────────');
      });
      
      console.log('\x1b[34m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
      console.log('\n');
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'No bugs found in the database.');
    }
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Error fetching bugs:', err.message);
  }
};

// Start server function
const startServer = async () => {
  try {
    displayBannerOne(); 
    displayBanner();
    await connectDB();
    
    // Display active bugs after connection
    await displayBugs(5, 'SOME OF THE ALREADY REPORTED BUGS IN OUR DATABASE');
    
    if (process.env.NODE_ENV !== 'test') {
      app.listen(PORT, () => {
        console.log('\n');
        console.log('\x1b[32m%s\x1b[0m', '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈');
        console.log('\x1b[33m%s\x1b[0m', `   🚀 Server running on port ${PORT}`);
        console.log('\x1b[36m%s\x1b[0m', `   🔗 http://localhost:${PORT}`);
        console.log('\x1b[32m%s\x1b[0m', '   Ready to track some bugs! 🐛');
        console.log('\x1b[32m%s\x1b[0m', '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈');
        console.log('\n');
      });
    }

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n');
      console.log('\x1b[33m%s\x1b[0m', '🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
      console.log('\x1b[33m%s\x1b[0m', '   Server shutting down gracefully...');
      console.log('\x1b[33m%s\x1b[0m', '   Current bugs will be preserved in database');
      console.log('\x1b[33m%s\x1b[0m', '🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑');
      console.log('\n');
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (err) {
    console.log('\n');
    console.log('\x1b[31m%s\x1b[0m', '💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
    console.log('\x1b[31m%s\x1b[0m', '   FATAL: Server startup failed!');
    console.log('\x1b[31m%s\x1b[0m', '💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀');
    console.error('\x1b[31m%s\x1b[0m', `   Error: ${err.message}`);
    console.log('\n');
    process.exit(1);
  }
};

// Export the app for testing
module.exports = app;

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}