// scorer.js
const gaussian = require('gaussian');

function calculateTimeDecay(movieReleaseDate) {
  const today = new Date();
  const releaseDate = new Date(movieReleaseDate);
  const timeDelta = today - releaseDate;
  const decayFactor = gaussian(0, 365).pdf(timeDelta);  // Gaussian decay function
  return decayFactor;
}

function calculateUserPreferenceScore(userPreferences, movieGenres) {
  // Similar function as mentioned in the previous response
}

function calculateRelatedUsersPreferenceScore(relatedUsers, movieId, userPreferences) {
  // Similar function as mentioned in the previous response
}

module.exports = { calculateTimeDecay, calculateUserPreferenceScore, calculateRelatedUsersPreferenceScore };
