import express from 'express'; 
import { login, register, getEmployee, updateEmployee, updatePassword } from "../controllers/user.controller.js";
import checkToken from '../middlewares/checkToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login); 
router.get('/employee', checkToken, getEmployee);
router.put('/employee/update', checkToken, updateEmployee)
router.put('/employee/password', checkToken, updatePassword)

export default router ; 