const models = require('../models');

// {
//   "product": "2",
//   "page": 0,
//   "count": 5,
//   "results": [
//     {
//       "review_id": 5,
//       "rating": 3,
//       "summary": "I'm enjoying wearing these shades",
//       "recommend": false,
//       "response": null,
//       "body": "Comfortable and practical.",
//       "date": "2019-04-14T00:00:00.000Z",
//       "reviewer_name": "shortandsweeet",
//       "helpfulness": 5,
//       "photos": [{
//           "id": 1,
//           "url": "urlplaceholder/review_5_photo_number_1.jpg"
//         },
//         {
//           "id": 2,
//           "url": "urlplaceholder/review_5_photo_number_2.jpg"
//         },
//         // ...
//       ]
//     },
//     {
//       "review_id": 3,
//       "rating": 4,
//       "summary": "I am liking these glasses",
//       "recommend": false,
//       "response": "Glad you're enjoying the product!",
//       "body": "They are very dark. But that's good because I'm in very sunny spots",
//       "date": "2019-06-23T00:00:00.000Z",
//       "reviewer_name": "bigbrotherbenjamin",
//       "helpfulness": 5,
//       "photos": [],
//     },
//     // ...
//   ]
// }

//product id returns array of review objects where 'id' corresponds to 'review_id' of photos table

const getReviews = (req, res) => {

	const productId = req.query.product_id || 5;
	//let reviewId = req.query.review_id || 5;
	const page = req.query.page || 1;
	const queryCount = req.query.count || 5;
	const querySort = req.query.sort || 'helpful';

	//count number of callbacks and increment until we hit count

		models.getReviews(productId, async (err, data) => {
			//console.log('DATA in controller: ', data);
			//let date = new Date(parseInt(data[0].date));

			let dataToSend = {
				product: productId,
        page: page,
        count: queryCount,
        results: []
			}

			// Checks if getReviews was successful.
			if (data.length) {

				console.log('LENGTH: ', data.length);

				//console.log('DATA: ', data);

				const photosArr = [];

				const getPhotosInfo = async (review) => {
					const reviewId = review.id
					//console.log(reviewId);
					//console.log('get Photos starting');
						const photosResponse = models.getPhotos(reviewId, async (err, data) => {
							if (err) {
								throw("Bug in models.getPhotos");
								console.log('Error retrieving photos in controller: ', err);
							} else {
								//console.log('photo data in controller: ', data);
								photosArr.push(data);
								if (photosArr.length === data.length) {
									dataToSend.results = photosArr;
									res.json(dataToSend).status(200);
								}

							}
						})
				}

				data.map(async (review) => {
					return getPhotosInfo(review)
				})


				//let date = new Date(parseInt(data[0].date));
			} else {
				res.send('No product with that ID!');
			}
		})
};

const	postReview = (req, res) => {

	let review = req.body;

	models.postReviews(review, () => {

		res.sendStatus(201);

	})
};

const	getMetaData = (req, res) => {

	models.getMetaData((err, metaData) => {

		res.json(metaData).status(200);

	})
};

const markHelpful = (req, res) => {

	let reviewId = req.params.review_id;

	models.markHelpful(reviewId, () => {

		res.sendStatus(204);
	})
};

const reportReview = (req, res) => {

	let reviewId = req.params.review_id;

	models.reportReview(reviewId, () => {

		res.sendStatus(204);
	})
};

module.exports = {
	getReviews,
  postReview,
  getMetaData,
  markHelpful,
  reportReview
};
