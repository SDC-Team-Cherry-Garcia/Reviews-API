const models = require('../models');

module.exports = {

	getReviews: (req, res) => {


	  let productId = req.query.product_id;

			models.getReviews(productId, (err, data) => {
				//console.log('DATA in controller: ', data);
				//let date = new Date(parseInt(data[0].date));

				if (data.length) {

					//let date = new Date(parseInt(data[0].date));
					res.json(data).status(200);
				} else {
					res.send('No product with that ID!');
				}

			})
	},

	postReview: (req, res) => {

		let review = req.body;

		models.postReviews(review, () => {

			res.sendStatus(201);

		})
	},
	getMetaData: (req, res) => {

		models.getMetaData((err, metaData) => {

			res.json(metaData).status(200);

		})
	},

  markHelpful: (req, res) => {

		let reviewId = req.query.review_id;

		models.markHelpful(reviewId, () => {

			res.sendStatus(204);
		})
	},

  reportReview: (req, res) => {

		let reviewId = req.query.review_id;

		models.reportReview(reviewId, () => {

			res.sendStatus(204);
		})

	}
}
