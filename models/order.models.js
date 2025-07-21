import db from '../config/db.js'

export const order = () => {
    const getProducts =
    'SELECT idProduct, unit, stock, criticalStock, priceHttc, nameProduct, categoryName FROM product INNER JOIN category ON product.categoryId = category.idCategory;'
    return db.query(getProducts)
}