const Bug = require('../models/Bug');

// Helper function to display beautiful bug list
const displayBugList = (bugs, title) => {
  console.log('\n');
  console.log('\x1b[45m%s\x1b[0m', ` 🐞🐞🐞 ${title} 🐞🐞🐞 `);
  console.log('\x1b[34m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
  
  bugs.forEach((bug, index) => {
    const createdAt = new Date(bug.createdAt).toLocaleString();
    console.log('\x1b[33m%s\x1b[0m', ` #${index + 1} • ${bug.title}`);
    console.log('\x1b[36m%s\x1b[0m', `   🆔 ID:       ${bug._id}`);
    console.log('\x1b[35m%s\x1b[0m', `   👤 Reporter: ${bug.reporter || 'Anonymous'}`);
    console.log('\x1b[32m%s\x1b[0m', `   🏷️ Status:   ${bug.status}`);
    console.log('\x1b[37m%s\x1b[0m', `   ⏰ Created:  ${createdAt}`);
    console.log('\x1b[34m%s\x1b[0m', '──────────────────────────────────────────────────────────────────────────────────');
  });
  
  console.log('\x1b[34m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
  console.log('\n');
};

// Create a new bug
exports.createBug = async (req, res) => {
  try {
    const bug = new Bug({
      ...req.body,
      reporter: req.body.reporter || 'Anonymous'
    });
    
    const savedBug = await bug.save();
    const createdAt = new Date(savedBug.createdAt).toLocaleString();
    
    // Enhanced console log for new bug
    console.log('\n');
    console.log('\x1b[42m%s\x1b[0m', ' 🎉🎉🎉 NEW BUG CREATED! 🎉🎉🎉 ');
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\x1b[33m%s\x1b[0m', ` 🆔 ID:          ${savedBug._id}`);
    console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${savedBug.title}`);
    console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${savedBug.reporter}`);
    console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${savedBug.description}`);
    console.log('\x1b[32m%s\x1b[0m', ` 🏷️ Status:      ${savedBug.status}`);
    console.log('\x1b[33m%s\x1b[0m', ` ⏰ Created At:  ${createdAt}`);
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\n');
    
    // Display beautiful list of latest 10 bugs
    const latestBugs = await Bug.find().sort({ createdAt: -1 }).limit(10);
    displayBugList(latestBugs, 'LATEST 10 BUGS IN DATABASE');
    
    res.status(201).json({
      success: true,
      message: 'Bug created successfully',
      data: savedBug
    });
  } catch (error) {
    console.error('❌ Error creating bug:', error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bugs
exports.getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    
    console.log(`📋 Retrieved ${bugs.length} bugs`);
    res.status(200).json({
      success: true,
      count: bugs.length,
      data: bugs
    });
  } catch (error) {
    console.error('❌ Error fetching bugs:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get bug by ID
exports.getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      console.error(`❌ Bug not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    // Convert MongoDB document to plain object and rename _id to id
    const bugData = bug.toObject();
    bugData.id = bugData._id;
    delete bugData._id;
    
    console.log(`🔍 Retrieved bug: ${bugData.id}`);
    res.status(200).json({
      success: true,
      data: bugData
    });
  } catch (error) {
    console.error('❌ Error fetching bug:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update a bug
exports.updateBug = async (req, res) => {
  try {
    const originalBug = await Bug.findById(req.params.id);
    
    if (!originalBug) {
      console.error(`❌ Bug not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    // Log original bug details
    console.log('\n');
    console.log('\x1b[43m%s\x1b[0m', ' 🔄 ORIGINAL BUG DETAILS (BEFORE UPDATE) ');
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\x1b[33m%s\x1b[0m', ` 🆔 ID:          ${originalBug._id}`);
    console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${originalBug.title}`);
    console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${originalBug.reporter}`);
    console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${originalBug.description}`);
    console.log('\x1b[32m%s\x1b[0m', ` 🏷️ Status:      ${originalBug.status}`);
    console.log('\x1b[33m%s\x1b[0m', ` 🔄 Last Updated: ${new Date(originalBug.updatedAt).toLocaleString()}`);
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\n');
    
    const updatedBug = await Bug.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    const updatedAt = new Date(updatedBug.updatedAt).toLocaleString();
    
    // Log updated bug details
    console.log('\x1b[44m%s\x1b[0m', ' 🔄🔄🔄 BUG UPDATED! 🔄🔄🔄 ');
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\x1b[33m%s\x1b[0m', ` 🆔 ID:          ${updatedBug._id}`);
    console.log('\x1b[36m%s\x1b[0m', ` 📛 Title:       ${updatedBug.title}`);
    console.log('\x1b[35m%s\x1b[0m', ` 👤 Reporter:    ${updatedBug.reporter}`);
    console.log('\x1b[37m%s\x1b[0m', ` 📝 Description: ${updatedBug.description}`);
    console.log('\x1b[32m%s\x1b[0m', ` 🏷️ Status:      ${updatedBug.status}`);
    console.log('\x1b[33m%s\x1b[0m', ` 🔄 Updated At:  ${updatedAt}`);
    console.log('\x1b[36m%s\x1b[0m', '══════════════════════════════════════════════════════════════════════════════════');
    console.log('\n');
    
    // Display beautiful list of latest 10 bugs
    const latestBugs = await Bug.find().sort({ createdAt: -1 }).limit(10);
    displayBugList(latestBugs, 'LATEST 10 BUGS AFTER UPDATE');
    
    res.status(200).json({
      success: true,
      message: 'Bug updated successfully',
      data: updatedBug
    });
  } catch (error) {
    console.error('❌ Error updating bug:', error.message);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a bug
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    
    if (!bug) {
      console.error(`❌ Bug not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: 'Bug not found'
      });
    }
    
    console.log(`🗑️ Bug deleted: ${bug._id}`);
    res.status(200).json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting bug:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};