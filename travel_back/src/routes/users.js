import {
    Router
}
    from 'express';

import {
    deleteUser,
    getAllUser,
    getAllAdmin,
    getSingleUser,
    updateUser,
    userRegister,
    VerifyEmail,
    userLogin,
}
    from '../controllers/userController.js';

import {
    verifyAdmin,
    verifyUser
}
    from '../middlewares/authMiddleWares.js';

const router = Router();

router.post('/register',userRegister);
router.post('/verifyEmail',VerifyEmail);
router.post('/login',userLogin);
router.get('/allUser', getAllUser);
router.get('/allAdmin', getAllAdmin);
router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getSingleUser);


export default router;
