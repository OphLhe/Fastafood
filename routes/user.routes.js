import express from 'express'; 
import { login, register, getEmployee, updateEmployee, updatePassword, getWelcome, deleteEmployee, } from "../controllers/user.controller.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login); 
router.get('/employee', checkToken, getEmployee);
router.put('/employee/update', checkToken, updateEmployee)
router.put('/employee/password', checkToken, updatePassword)
router.delete('/employee/:id', checkToken, deleteEmployee)
router.get('/employee/welcome', checkToken, getWelcome)


export default router; 