const db = require('../../database');


//you can use Date('string') in JS with the 13 char format and it returns it in a legible format. I'm doing the inverse to store new reviews Date.now().toString().

const getReviews = callback => {

  //query combines reviews table with photos table join on ????

  let params = [];

  let queryString = 'SELECT * from reviews where product_id=1';

  db.query(queryString, params, (err, results) => {
    if (err) {
      console.log('Error getting all reviews from database: ', err);
      callback(err);
    } else {
      console.log('Successfully retrieved review data');
      callback(null, results);
    }
  });
};

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

//https://www.mysqltutorial.org/mysql-update-data.aspx
//UPDATE, SET, WHERE

const markHelpful = callback => {

  let queryString = 'UPDATE reviews where ........?';

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

  //Require ID of the review to update

  let queryString = 'UPDATE reviews WHERE ........?';

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
  postReview,
  getMetaData,
  markHelpful,
  reportReview
};
