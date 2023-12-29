const { Schema, model } = require('mongoose')

const productsCollection = "Products"

const ProductsSchema = Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    img: String,
    cantidad: Number,
    type: String
})

const productsModel = model(productsCollection, ProductsSchema)

module.exports = {
    productsModel
}