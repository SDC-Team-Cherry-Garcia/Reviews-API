const db = require('../../database');

const getReviews = callback => {

  let params = [];

  let queryString = 'SELECT * from reviews';

  db.query(queryString, params, (err, results) => {
    if (err) {
      console.log('Error getting all reviews from database: ', err);
      callback(err);
    } else {
      console.log('Successfully retrieved transaction data');
      callback(null, results);
    }
  });
};

const postReviews = (reviewData, callback) => {

  let params = [categoryData.id, categoryData.date, categoryData.category];

  let queryString = 'INSERT IGNORE INTO reviews VALUES (?, ?, ?)';

  db.query(queryString, params, (err, results) => {
    if (err) {
      console.log('Error inserting reviews into database: ', err);
      callback(err);
    } else {
      console.log('Successfully stored review data');
      callback(null, results);
    }
  });
};

const getMetaData = callback => {

  let queryString = 'SELECT ........?';

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error retrieving metadata from database: ', err);
      callback(err);
    } else {
      console.log('Successfully retrieved metadata');
      callback(null, results);
    }
  });
};

const markHelpful = callback => {

  let queryString = 'SELECT ........?';

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error marking post as helpful: ', err);
      callback(err);
    } else {
      console.log('Successfully marked review helpful');
      callback(null, results);
    }
  });
};

const reportReview = callback => {

  let queryString = 'SELECT ........?';

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error reporting review: ', err);
      callback(err);
    } else {
      console.log('Successfully reported review');
      callback(null, results);
    }
  });
};

module.exports = {
  getReviews,
  postReviews,
  getMetaData,
  markHelpful,
  reportReview
};
