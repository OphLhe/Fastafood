import dotenv from "dotenv";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as stockModels from '../models/stocks.models.js';

dotenv.config(); 

export const addStocks= async(req, res) => {

    const{unit, stock, criticalStock, priceHttc, nameProduct, categoryId} = req.body; 

    try {

        await stockModels.addStocks(unit, stock, criticalStock, priceHttc, nameProduct, categoryId)
        res.status(201).json({message:'produit créé'});

    } catch (error) {
        res.status(500).json({message:"erreur lors de la création", error})
    }
}

export const addCategory= async(req, res) => {

    const{categoryName} = req.body; 

    try {

        await stockModels.addCategoryName(categoryName)
        res.status(201).json({message:'catégorie créé'});

    } catch (error) {
        res.status(500).json({message:"erreur lors de la création", error})
    }
}

export const getStocks= async (req,res) => {
        
    try {
        const [result] = await stockModels.stocks()
        if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:'produit non trouvé'});
        }
    } catch (error) {
        res.status(500).json({message: "erreur lors de la récupération du produit", error})
    } 
}

export const getCategoryName = async (req, res) => {

    try {
        const [result] = await stockModels.categoryName()
         if(result.length > 0){
            res.status(200).json(result);
        }else{
            res.status(404).json({message:'produit non trouvé'});
        }
    } catch (error) {
       res.status(500).json({message: "erreur lors de la récupération de la categorie", error})
    }
}

export const getProductByName = async (req,res) => {
    const {categoryName} = req.params
    try {
        const [result] = await stockModels.productByName(categoryName)
        if(result.length > 0){
            res.status(200).json(result)
        }else{
            res.status(404).json({message:'nom du produit non trouvé', error})
        }
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la récupération des produits par nom', error})
    }
}