import express from 'express';
import Auth from './auth';
import User from './user';
import Store from './store';
import Order from './order';

// Import AuthMiddleware
import AuthMiddleware from '../common/authMiddleware';

// Import External
import { Excel } from '../external';

const router = express.Router();

// Setting Middleware
router.get('/user', AuthMiddleware);
router.use('/order', AuthMiddleware);
router.use('/store', AuthMiddleware);

// Auth API
router.get('/check', Auth.check);
router.post('/register', Auth.register);
router.post('/login', Auth.login);

// User API
router.get('/user', User.getAllUser);
router.get('/user/:_id', User.getUser);
router.get('/user/list/:branchCode', User.getUserInStore);
router.put('/user/:_id', User.updateUser);
router.delete('/user/:_id', User.deleteUser);

// Store API
router.get('/store/list', Store.getAllStore);
router.get('/store/first', Store.getFirstStore);
router.post('/store', Store.addStore);
router.put('/store/:branchCode', Store.updateStore);
router.delete('/store/:branchCode', Store.deleteStore);

// Order API
router.get('/order/list/:branchCode?', Order.getAllOrderList);
router.get('/order/branch/incomplete', Order.getIncompleteBranchList);
router.get('/order/branch/complete', Order.getCompleteBranchList);
router.get('/order/:branchCode?', Order.getOrderList);
router.post('/order', Order.updateOrderList);
router.put('/order/complete/:branchCode', Order.setComplete);
router.delete('/order/:_id', Order.deleteOrderList);

module.exports = router;