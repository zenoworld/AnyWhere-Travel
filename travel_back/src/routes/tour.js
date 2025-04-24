import {
    Router
}
    from 'express';
import { adminPageTour } from '../controllers/tourController.js';
import {
    createTour,
    deleteTour,
    getAllTour,
    getFeaturetour,
    getSingleTour,
    getTourBySearch,
    getTourCount,
    updateTour,
} from '../controllers/tourController.js'

const router = Router()
router.get('/adminPageTour', adminPageTour);//FOR MAKE IT WORK I HAVE TO DECLARE IT FIRST
router.post('/createTour', createTour);
router.patch('/:id', updateTour);
router.delete('/:id', deleteTour);
router.get('/:id', getSingleTour);
router.get('/', getAllTour);
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturetour', getFeaturetour);
router.get('/search/getTourCount', getTourCount);
export default router