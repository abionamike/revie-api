import express from 'express';
import { listReviews, mostRecent, mostHelpful, createReview, markAsHelpful } from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', listReviews);
router.get('/most-recent', mostRecent);
router.get('/most-helpful', mostHelpful);
router.post('/', protect, createReview);
router.put('/:id', markAsHelpful);

export default router;