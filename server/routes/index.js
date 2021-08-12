const router = require('express').Router();
const controllers = require('../controllers');

//Required param: product_id
//Optional params: page(int), count(int), sort(string)
router.get('/', controllers.getReviews);

//** */
router.post('/', controllers.postReview);
router.get('/meta', controllers.getMetaData);
router.put('/:review_id/helpful', controllers.markHelpful);
router.put('/:review_id/report', controllers.reportReview);

module.exports = router;