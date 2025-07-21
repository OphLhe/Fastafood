import express from 'express'; 
import checkToken from '../middlewares/checkToken.js';
import { getProducts } from '../controllers/order.controllers.js';

const router = express.Router();

router.get('/order ', checkToken, getProducts)



export default router;