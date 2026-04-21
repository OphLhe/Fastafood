import express from 'express'; 
import { addStocks, getCategoryName, getStocks, addCategory, getProductByName} from "../controllers/stocks.controller.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/addStocks', addStocks)
router.post('/addCategory', addCategory)
router.get('/stocks', checkToken, getStocks)
router.get('/getCategoryName', checkToken, getCategoryName)
router.get('/getProductByName/:categoryName', checkToken, getProductByName)

export default router;