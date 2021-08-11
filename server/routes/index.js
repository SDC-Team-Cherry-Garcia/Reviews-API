const router = require('express').Router();
const controllers = require('../controllers');

const router = express.Router();

//Required param: product_id
//Optional params: page(int), count(int), sort(string)
router.get('/reviews/', controllers.getReviews);

//** */
router.post('/reviews/', controllers.postReview);
router.get('/reviews/meta', controllers.getMetaData);
router.put('/reviews/:review_id/helpful', controllers.markHelpful);
router.put('/:id/likePost', controllers.reportReview);

export default router;