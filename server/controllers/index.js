const models = require('../models');

module.exports = {

	getReviews: (req, res) => {

		console.log(req.body);




//Create your custom format
// var fdate = (date.getMonth() + 1)+'/'+ date.getDate()  +'/'+date.getFullYear()
// alert(fdate);

// // example representations
// alert(date);
// alert(date.toDateString());

		models.getReviews((err, data) => {
			console.log('DATA in controller: ', data);
			let date = new Date(parseInt(data[0].date));

			res.json(data).status(200);
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
