import {
    Router
}
    from 'express';
import {
    createReview, getAllReviews
}
    from '../controllers/reviewController.js';
import {
    verifyUser
}
    from '../utils/verifyToken.js';

const router = Router();
router.post('/', createReview)
router.get('/:id', getAllReviews)

export default router