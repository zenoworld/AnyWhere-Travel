import { 
    Router } 
    from 'express';
import { 
    createReview } 
    from '../controllers/reviewController.js';
import { 
    verifyUser } 
    from '../utils/verifyToken.js';

const router=Router();
router.post('/:tourId',createReview)

export default router