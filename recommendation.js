// recommendation.js
const { parseDatasets } = require('./parser');
const { calculateTimeDecay, calculateUserPreferenceScore, calculateRelatedUsersPreferenceScore } = require('./scorer');

function generatePersonalizedFeed(userId) {
  const { users, relatedUsers, movies, userPreferences } = parseDatasets();

  // Filter user-related data
  const currentUser = users.find(user => user.user_id === userId);
  const userPreferencesForUser = userPreferences.filter(p => p.user_id === userId);
  const relatedUsersForUser = relatedUsers
    .filter(relatedUser => relatedUser.user_id === userId)
    .map(relatedUser => relatedUser.related_user_id);

  // Calculate scores for each movie
  const personalizedFeed = movies.map(movie => {
    const timeDecay = calculateTimeDecay(movie.release_date);
    const userPreferenceScore = calculateUserPreferenceScore(userPreferencesForUser, movie.genres.split(','));
    const relatedUsersPreferenceScore = calculateRelatedUsersPreferenceScore(relatedUsersForUser, movie.movie_id, userPreferences);

    const overallRelevance = timeDecay + userPreferenceScore + relatedUsersPreferenceScore;

    return { ...movie, overallRelevance };
  });

  // Sort movies by overall relevance and select top 10
  const topMovies = personalizedFeed.sort((a, b) => b.overallRelevance - a.overallRelevance).slice(0, 10);
  console.log('Top 10 Movies:', topMovies);

  return topMovies;
}

module.exports = { generatePersonalizedFeed };
