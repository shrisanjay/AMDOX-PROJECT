// Simple JSON-based data store for testing without MongoDB
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'db.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize empty database
const initDB = () => {
  return {
    users: [],
    jobSeekerProfiles: [],
    employerProfiles: [],
    jobs: [],
    applications: []
  };
};

// Load database
const loadDB = () => {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return initDB();
};

// Save database
const saveDB = (db) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Generate ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  loadDB,
  saveDB,
  generateId
};
