import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as orderModels from '../models/order.models.js';

dotenv.config(); 

export const getProducts= async (req,res) => {
        
    try {
        const [result] = await orderModels.order()
        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:'produit non trouvé'});
        }
    } catch (error) {
        res.status(500).json({message: "erreur lors de la récupération du produit", error})
    } 
}