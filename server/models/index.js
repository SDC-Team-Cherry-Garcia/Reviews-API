const db = require('../../database');

//json_build_object()
//json_agg()

//you can use Date('string') in JS with the 13 char format and it returns it in a legible format. I'm doing the inverse to store new reviews Date.now().toString().

const getReviews = (productId, callback) => {

  //query combines reviews table with photos table join on review_id, id
  //DO NOT RETURN if reported = true

  let params = [];

  //console.log('product id in model: ', productId);

  let queryString = `SELECT * FROM reviews WHERE product_id=${productId}`;

  db.query(queryString, params, (err, results) => {
    if (err) {
      console.log('Error getting all reviews from database: ', err);
      callback(err);
    } else {
      console.log('Successfully retrieved review data');
      console.log(results);
      callback(null, results);
    }
  });
};

//no path for this, just a helper function for /reviews endpoint
//try to promisify this function
const getPhotos = (reviewId, callback) => {

  let params = [];

  //console.log('review id in getPhotos model: ', reviewId);

  let queryString = `SELECT id, url FROM photos WHERE review_id=${reviewId}`;

  db.query(queryString, params, (err, results) => {
    if (err) {
      console.log('Error getting photos from database: ', err);
      callback(err);
    } else {
      console.log('Successfully retrieved photo data');
      //console.log('Photos: ', results);
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
