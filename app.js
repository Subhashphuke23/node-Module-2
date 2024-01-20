
const express = require('express');
const { generatePersonalizedFeed } = require('./recommendation');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/personalized-feed/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const personalizedFeed = generatePersonalizedFeed(userId);
  res.json(personalizedFeed);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
