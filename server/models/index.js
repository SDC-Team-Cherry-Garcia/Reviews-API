const db = require('../../database');

const getReviews = (productId, sortMethod, callback) => {

  console.log(sortMethod);

  let queryString = ``;

  if (sortMethod === 'helpful') {
    queryString = `SELECT * FROM reviews WHERE product_id=${productId} ORDER BY helpfulness DESC`;
  } else if (sortMethod === 'newest') {
    queryString = `SELECT * FROM reviews WHERE product_id=${productId} ORDER BY date DESC`;
  } else if (sortMethod === 'relevant') {
    queryString = `SELECT * FROM reviews WHERE product_id=${productId} ORDER BY rating DESC, helpfulness DESC, date DESC`;
  }

  db.query(queryString, (err, results) => {
    if (err) {
      console.log('Error getting all reviews from database: ', err);
      callback(err);
    } else {
      //remove reported reviews
      const notReported = [];
      results.forEach(result => {
        if (result.reported === 'false') {
          notReported.push(result);
        }
      })
      callback(null, notReported);
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

  console.log(reviewData);

  let params = [];

  reviewData.results.forEach(result => {
    params = [reviewData.product, result.review_id, result.rating, result.summary, result.recommend, "null", result.response, result.body, Date.now().toString(), result.reviewer_name, result.reviewer_email, result.helpfulness];
  })

  let queryString = 'INSERT IGNORE INTO reviews(product_id, id, rating, summary, recommend, reported, response, body, date, reviewer_name, reviewer_email, helpfulness) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

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
