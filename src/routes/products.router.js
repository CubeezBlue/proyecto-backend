const { Router, response } = require('express')
const ProductManagerFile = require('../managers/productsManagerFile')
const { productsModel } = require('../models/products.model')
const router = Router()
const productService = new ProductManagerFile()
router
    .get('/', async(req, res) => {
        try {
            const products = await productsModel.find()
            res.send(products)
        } catch {
            console.log("Hubo un error")
        }

    })
    .get('/:pid', async(req, res) => {
        const { pid } = req.params
        const { body } = req.params
        try {
            const result = await productsModel.updateOne({ _id: pid }, body)
            res.status(201), send({
                status: 'success',
                payload: result
            })
        } catch {
            console.log("Hubo un error")
        }
    })
    .post('/', async(req, res) => {
        try {
            const { nombre, precio, descripcion, img, cantidad } = req.body
            const result = await productsModel.create({
                nombre,
                precio,
                descripcion,
                img,
                cantidad
            })

            res.status(404).send({
                product: 'product'
            })
        } catch {
            console.log("Hubo un error")
        }

    })
    .put('/:pid', (req, res) => {
        const { pid } = req.params
        res.send('put de product ' + pid)
    })
    .delete('/:pid', async(req, res) => {
        const { pid } = req.params
        const product = await productsModel.deleteOne({ _id: pid })
        try {
            res.status(200).send({
                status: 'succes',
                payload: product
            })
        } catch {
            console.log("Hubo un error")
        }
    })





module.exports = router