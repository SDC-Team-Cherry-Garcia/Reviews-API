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

// {
//   "product_id": "2",
//   "ratings": {
//     2: 1,
//     3: 1,
//     4: 2,
//     // ...
//   },
//   "recommended": {
//     0: 5
//     // ...
//   },
//   "characteristics": {
//     "Size": {
//       "id": 14,
//       "value": "4.0000"
//     },
//     "Width": {
//       "id": 15,
//       "value": "3.5000"
//     },
//     "Comfort": {
//       "id": 16,
//       "value": "4.0000"
//     },
//     // ...
// }

const getMetaData = (req, res) => {
	const productId = req.query.product_id;

	let dataToSend = {
		product_id: productId,
		ratings: {

		},
		recommend: {

		},
		characteristics: {

		}
	}

	// getMetaDataCharacteristics
  // getMetaDataValues
  // getRating

  models.getMetaDataCharacteristics(productId, (err, metaData) => {
		console.log(metaData);

		let dataContainer = [];

		metaData.forEach(char => {
			dataContainer.push(char);
		})

		//try object.assign

    let obj = dataContainer.reduce((acc, cur, i) => {
			// let name = cur.name || 'Fit';
			// let newObj;
			// if (name !== undefined) {
			// 	newObj[name] = {
			// 		id: cur.id
			// 	}
			// }
			acc[i] = cur;
			console.log('CUR', cur.name);
			return acc;
		}, {});

		dataToSend.characteristics = obj;

		for (let key in dataToSend.characteristics) {
			console.log('key1', key);
			let newKey = dataToSend.characteristics[key].name;
			key = newKey;
			console.log('key2', key);
		}
		console.log('TEST', dataToSend.characteristics)

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
