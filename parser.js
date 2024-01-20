const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function parseDatasets() {
  const users = [];
  const relatedUsers = [];
  const movies = [];
  const userPreferences = [];

  // Use an absolute path to the 'users.csv' file
  const usersFilePath = path.join(__dirname, 'users.csv');

  // Check if the file exists before attempting to read
  if (fs.existsSync(usersFilePath)) {
    const stream = fs.createReadStream(usersFilePath);

    stream
      .on('error', (error) => {
        console.error(`Error reading 'users.csv': ${error.message}`);
      })
      .pipe(csv())
      .on('data', (row) => users.push(row))
      .on('end', () => {
        console.log('Users:', users);
      });
  } else {
    console.error(`'users.csv' does not exist at path: ${usersFilePath}`);

    // Create the 'users.csv' file with sample data
    const sampleData = 'user_id,name\n1,John\n2,Jane\n3,Bob';
    fs.writeFileSync(usersFilePath, sampleData, 'utf8');
    console.log(`'users.csv' created with sample data at path: ${usersFilePath}`);
  }

  // Similar parsing for Related Users, Movies, and User Preferences datasets

  return { users, relatedUsers, movies, userPreferences };
}

module.exports = { parseDatasets };
