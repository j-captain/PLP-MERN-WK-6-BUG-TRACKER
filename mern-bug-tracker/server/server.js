require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const Bug = require('./models/Bug');
const mongoose = require('mongoose');

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

// Create the Express app
const createApp = () => {
  const app = express();
  const PORT = process.env.PORT || 5000;

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

  return app;
};

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

// Start server
const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 5000;

  try {
    displayBannerOne(); 
    displayBanner();
    await connectDB();
    
    // Display active bugs after connection
    await displayBugs(5, 'SOME OF THE ALREADY REPORTED BUGS IN OUR DATABASE');
    
    // Add routes that need DB connection
    app.post('/api/bugs', async (req, res, next) => {
      try {
        const newBug = await Bug.create(req.body);
        const createdAt = new Date(newBug.createdAt).toLocaleString();
        
        console.log('\n');
        console.log('\x1b[42m%s\x1b[0m', ' 🎉🎉🎉 NEW BUG CREATED! 🎉🎉🎉 ');
        console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
        console.log('\x1b[33m%s\x1b[0m', ` 🆔 ID:          ${newBug._id}`);
        console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${newBug.title}`);
        console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${newBug.reporter || 'Anonymous'}`);
        console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${newBug.description}`);
        console.log('\x1b[32m%s\x1b[0m', ` � Status:      ${newBug.status}`);
        console.log('\x1b[33m%s\x1b[0m', ` ⏰ Created At:  ${createdAt}`);
        console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
        console.log('\n');
        
        await displayBugs(10, 'LATEST 10 BUGS IN DATABASE');
        res.status(201).json(newBug);
      } catch (error) {
        next(error);
      }
    });

    app.put('/api/bugs/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        const updatedBug = await Bug.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedBug) {
          return res.status(404).json({ message: 'Bug not found' });
        }
        
        const updatedAt = new Date(updatedBug.updatedAt).toLocaleString();
        
        console.log('\n');
        console.log('\x1b[44m%s\x1b[0m', ' 🔄🔄🔄 BUG UPDATED! 🔄🔄🔄 ');
        console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
        console.log('\x1b[33m%s\x1b[0m', ` 🆔 ID:          ${updatedBug._id}`);
        console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${updatedBug.title}`);
        console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${updatedBug.reporter || 'Anonymous'}`);
        console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${updatedBug.description}`);
        console.log('\x1b[32m%s\x1b[0m', ` 🏷️ Status:      ${updatedBug.status}`);
        console.log('\x1b[33m%s\x1b[0m', ` 🔄 Updated At:  ${updatedAt}`);
        console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
        console.log('\n');
        
        await displayBugs(10, 'LATEST 10 BUGS AFTER UPDATE');
        res.status(200).json(updatedBug);
      } catch (error) {
        next(error);
      }
    });

    app.listen(PORT, () => {
      console.log('\n');
      console.log('\x1b[32m%s\x1b[0m', '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈');
      console.log('\x1b[33m%s\x1b[0m', `   🚀 Server running on port ${PORT}`);
      console.log('\x1b[36m%s\x1b[0m', `   🔗 http://localhost:${PORT}`);
      console.log('\x1b[32m%s\x1b[0m', '   Ready to track some bugs! 🐛');
      console.log('\x1b[32m%s\x1b[0m', '🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈');
      console.log('\n');
    });

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

// Export for testing
module.exports = { createApp };

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}