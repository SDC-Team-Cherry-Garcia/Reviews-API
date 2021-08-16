const models = require('../models');

//product id returns array of review objects where 'id' corresponds to 'review_id' of photos table

const getReviews = (req, res) => {
  const productId = req.query.product_id || 5;
  const page = req.query.page || 1;
  const queryCount = req.query.count || 5;
  const querySort = req.query.sort || 'helpful';

  models.getReviews(productId, (err, reviewData) => {
    let dataToSend = {
      product: productId,
      page: page,
      count: queryCount,
      results: [],
    };

    //checks if getReviews was successful
    if (reviewData.length) {
      const reviewsArr = [];

      reviewData.forEach(review => {
        models.getPhotos(review.id, (err, photoData) => {
          if (err) {
            console.log('Error retrieving photos in controller: ', err);
          } else {
            reviewsArr.push({
              review_id: review.id,
              rating: review.rating,
              summary: review.summary,
              recommend: JSON.parse(review.recommend),
              response: JSON.parse(review.response),
              body: review.body,
              date: new Date(parseInt(review.date)),
              reviewer_name: review.reviewer_name,
              helpfulness: review.helpfulness,
              photos: photoData,
            });

            //tells us when callback is finished and we can send data back
            if (reviewsArr.length === reviewData.length) {
              dataToSend.results = reviewsArr;
              res.json(dataToSend).status(200);
            }
          }
        });
      });
    } else {
      res.send('No product with that ID!');
    }
  });
};

const postReview = (req, res) => {
  let review = req.body;

  models.postReviews(review, () => {
    res.sendStatus(201);
  });
};

const getMetaData = (req, res) => {
  models.getMetaData((err, metaData) => {
    res.json(metaData).status(200);
  });
};

const markHelpful = (req, res) => {
  let reviewId = req.params.review_id;

  models.markHelpful(reviewId, () => {
    res.sendStatus(204);
  });
};

const reportReview = (req, res) => {
  let reviewId = req.params.review_id;

  models.reportReview(reviewId, () => {
    res.sendStatus(204);
  });
};

module.exports = {
  getReviews,
  postReview,
  getMetaData,
  markHelpful,
  reportReview,
};
