import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({

	product_id: Number,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: {
				type: Date,
				default: new Date()
			},
      reviewer_name: String,
      helpfulness: Number,
      photos: [{
          id: Number,
          url: String
		  }]
	],
	ratings: {
		1: Number,
		2: Number,
		3: Number,
		4: Number,
		5: Number
	},
	recommended: {
		0: Number
	},
	characteristics: {
    Size: {
      id: Number,
      value: Double
    },
    Width: {
      id: Number,
      value: Double
    },
    Comfort: {
      id: Number,
      value: Double
    }
	}
});

const ReviewProducts = mongoose.model('ReviewProducts', reviewSchema);

export default ReviewProducts;