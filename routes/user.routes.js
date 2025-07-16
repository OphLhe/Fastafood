import express from 'express'; 
import { login, register, getEmployee, updateEmployee, updatePassword, getWelcome, stocks } from "../controllers/user.controller.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login); 
router.get('/employee', checkToken, getEmployee);
router.put('/employee/update', checkToken, updateEmployee)
router.put('/employee/password', checkToken, updatePassword)
router.get('/employee/welcome', checkToken, getWelcome)
router.post('/stocks', stocks)

export default router; 