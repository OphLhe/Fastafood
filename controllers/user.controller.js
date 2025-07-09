import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModels from '../models/user.models.js';

dotenv.config(); 

// inscription employé.es
export const register = async (req, res) => {

    const{firstName, lastName, mail, password, role} = req.body; 

    try {
        const cryptedPassword = await bcrypt.hashSync(password, 10);
        
        await userModels.addEmployee(firstName, lastName, mail, cryptedPassword, role )
        res.status(201).json({message:'utilisateur créé'});

    } catch (error) {
        res.status(500).json({message:"erreur lors de l'inscription", error})
    }
};

// connexion employé.es
export const login = async (req, res) => {
    const {firstName, lastName, password} = req.body
    console.log(process.env.JWT_SECRET);
    
    try {
        const [result] = await userModels.loginEmployee(firstName, lastName); 
        const employeeData = result[0];
        if(result){
            const checkPassword = await bcrypt.compare(password, employeeData.password);
            if(checkPassword == true){
                const token = jwt.sign({ idEmployee: employeeData.idEmployee, firstName: employeeData.firstName, lastName: employeeData.lastName}, process.env.JWT_SECRET, {expiresIn:'7h'})
                res.status(201).json({
                    message: 'connexion autorisée',
                    token:token
                })
            }else {
                res.status(403).json({message: 'accés refusé'})
            }
        } else {
            res.status(104).json({message:'employé inconnu'})
        }

    } catch (error) {
        res.status(500).json({message:"erreur lors de la connexion", error})
        console.log(error);
    }
}

export const getEmployee = async (req, res) => {

    const employeeId = req.employee.idEmployee; 
    try {
        const [result] = await userModels.getEmployeeAccount(employeeId); 

        if(result.length > 0){
            res.status(200).json(result[0]);
        }else{
            res.status(400).json({message:'employé.e non trouvé.e'});
        }

    } catch (error) {
        res.status(500).json({message: 'erreur lors de la récupération', error})
        console.log(error);
    }
}

export const updateEmployee = async (req, res) => {
    const employeeId = req.employee.idEmployee; 

    const {firstName, lastName, mail} = req.body;

    try {
        await userModels.updateEmployeeAccount(firstName, lastName, mail, employeeId);
        res.status(200).json({message:"compte mis à jour"});
    } catch (error) {
        res.status(500).json({message:"erreur lors de la mise à jour du compte", error});
        console.log(error);
    }
}

export const updatePassword = async (req, res) => {
    const employeeId = req.employee.idEmployee; 

    const {oldPassword, newPassword} = req.body; 

    try {
        const [result] = await userModels.getEmployeePassword(employeeId); 

        if(result.length > 0){
            const employeeData = result[0]; 
            const checkOldPassword = await bcrypt.compare(oldPassword, employeeData.password);

            if(checkOldPassword){
                const cryptedNewPassword = await bcrypt.hashSync(newPassword,10);
                
                await userModels.updateEmployeePassword(cryptedNewPassword, employeeId); 

                res.status(200).json({message: "mot de passe mis à jour"});
            } else{
                res.status(403).json({message:"ancien mot de passe incorrect"});
            } 
        } else{
                res.status(404).json({message:"utilisateur non trouvé"});
            }
        } catch (error) {
        res.status(500).json({message:"erreur lors de la mise à jour du compte", error});
        console.log(error);
    }
}