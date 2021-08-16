const db = require('../../database');

const getReviews = (productId, callback) => {

  let queryString = `SELECT * FROM reviews WHERE product_id=${productId}`;

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error getting all reviews from database: ', err);
      callback(err);
    } else {
      //remove reported reviews
      results.forEach(result => {
        if (result.reported === 'false') {
          const index = results.indexOf(result);
          results = results.splice(index, 1, result);
          callback(null, results);
        }
      })
    }
  });
};

//no path for this, just a helper function for /reviews endpoint
const getPhotos = (reviewId, callback) => {

  let queryString = `SELECT id, url FROM photos WHERE review_id=${reviewId}`;

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error getting photos from database: ', err);
      callback(err);
    } else {
      callback(null, results);
    }
  });
}

const postReview = (reviewData, callback) => {

  let params = [];

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

const markHelpful = (reviewId, callback) => {

  let queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${reviewId}`;

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

const reportReview = (reviewId, callback) => {

  let queryString = `UPDATE reviews SET reported = 'true' WHERE id = ${reviewId}`;

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
  getPhotos,
  postReview,
  getMetaData,
  markHelpful,
  reportReview
};
