import db from '../config/db.js'

export const addStocks = (unit, stock, criticalStock, priceHttc, nameProduct, categoryId) => {
    const addStocks = 
    'INSERT INTO product (unit, stock, criticalStock, priceHttc, nameProduct, categoryId) VALUES (?, ?, ?, ?, ?, ?);'
    return db.query(addStocks, [unit, stock, criticalStock, priceHttc, nameProduct, categoryId]);
}

export const addCategoryName = (categoryName) => {
    const addCategoryName = 
    'INSERT INTO category (categoryName) VALUES (?);'
    return db.query(addCategoryName, [categoryName]);
}

export const stocks = () => {
    const getStocks =
    'SELECT idProduct, unit, stock, criticalStock, priceHttc, nameProduct, categoryName FROM product INNER JOIN category ON product.categoryId = category.idCategory;'
    return db.query(getStocks)
}

export const categoryName = () => {
    const getCategoryName = 
    'SELECT idCategory, categoryName FROM category;'
    return db.query(getCategoryName)
}

export const productByName = (categoryName) => {
    const getProductByName = 
    `SELECT idProduct, nameProduct, priceHttc, stock FROM product INNER JOIN category ON product.categoryId = category.idCategory WHERE category.categoryName = ?;`
    return db.query(getProductByName,[categoryName])
}