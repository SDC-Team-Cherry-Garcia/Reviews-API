import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/reviews.js';

const router = express.Router();

//Required param: product_id
//Optional params: page(int), count(int), sort(string)
router.get('/reviews/', getReviews);

//** */
router.post('/reviews/', postReviews);
router.get('/reviews/meta', getMetaData);
router.put('/reviews/:review_id/helpful', markHelpful);
router.put('/:id/likePost', reportReview);

export default router;