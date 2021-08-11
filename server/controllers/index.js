const models = require('../models');

module.exports = {

	getReviews: (req, res) => {

		models.getReviews(reviewData => {

      res.json(reviewData).status(200);

		})
	},

	postReview: (req, res) => {

		let review = req.body;

		models.postReviews(review, () => {

			res.sendStatus(201);

		})
	},
	getMetaData: (req, res) => {

		models.getMetaData(metaData => {

			res.json(metaData).status(200);

		})
	},

  markHelpful: (req, res) => {

		models.markHelpful(() => {

			res.sendStatus(204);
		})
	},

  reportReview: (req, res) => {

		models.reportReview(() => {

			res.sendStatus(204);
		})

	}
}
