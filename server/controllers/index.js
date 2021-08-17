const models = require('../models');

//product id returns array of review objects where 'id' corresponds to 'review_id' of photos table
const getReviews = (req, res) => {
  const productId = req.query.product_id;
  const page = req.query.page || 1;
  const queryCount = req.query.count || 5;
  const sortMethod = req.query.sort || 'newest';

  models.getReviews(productId, sortMethod, queryCount, (err, reviewData) => {
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

            //**tells us when callback is finished and we can send data back
            if (reviewsArr.length === reviewData.length) {
              dataToSend.results = reviewsArr;
              res.json(dataToSend).status(200);
            }
          }
        })
      })
    } else {
      res.send('No product with that ID!');
    }
  })
};

const postReview = (req, res) => {
  let review = req.body;

  models.postReview(review, () => {
    res.sendStatus(201);
  });
};

const getMetaData = (req, res) => {
	const productId = req.query.product_id;

	let dataToSend = {
		product_id: productId,
		ratings: {},
		recommend: {},
		characteristics: {}
	}

	models.getRatingAndRecs(productId, (err, ratingData) => {
		let newData = {};
		let recData = {};

		ratingData.forEach(rating => {
			let ratingKey = rating.rating;
			if (!newData[ratingKey]) {
				newData[ratingKey] = 1;
			} else {
				newData[ratingKey]++;
			}

			let recKey = rating.recommend;
			if (!recData[recKey]) {
				recData[recKey] = 1;
			} else {
				recData[recKey]++;
			}
		})
		dataToSend.ratings = newData;
		dataToSend.recommend = recData;
	})

  models.getMetaDataCharacteristics(productId, (err, metaData) => {

		metaData.forEach(characteristic => {
			let name = characteristic.name;
			dataToSend.characteristics[name] = {id: characteristic.id, value: "0.0000"};

		  models.getMetaDataValues(productId, characteristic.id, (err, valueData) => {
				console.log('Value Data: ', valueData);

				if (err) {
					console.log('Error retrieving value data in controller');
				}

				//**THIS PART ISN'T WORKING */

				// else {

				// 	valueData.forEach(value => {
				// 		dataToSend.characteristics[name].value = value.value;
				// 	})
				// }
			})
		})

    res.json(dataToSend).status(200);
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
