const { Router } = require('express')
const ProductManagerFile = require('../managers/productsManagerFile')
const router = Router()
const productService = new ProductManagerFile()
router
    .get('/', async(req, res) => {
        const products = await productService.getProducts()
        res.send({
            status: 'succes',
            payload: products
        })
    })
    .get('/:pid', async(req, res) => {
        const { pid } = req.params
        const product = await productService.getProduct(parseInt(pid))
        if (!product) {
            return res.status(400).send({
                status: 'error',
                payload: 'No se encontro el producto'
            })
        }
        res.send({
            status: 'succes',
            payload: product
        })
    })
    .post('/', (req, res) => {
        res.send('post de product ')
    })
    .put('/:pid', (req, res) => {
        const { pid } = req.params
        res.send('put de product ' + pid)
    })
    .delete('/:pid', async(req, res) => {
        const { pid } = req.params
        const product = await productService.deleteProduct(parseInt(pid))
        if (!product) {
            return res.status(400).send({
                status: 'error',
                payload: 'No se encontro el producto'
            })
        }
        res.send({
            status: 'succes',
            payload: product
        })
    })





module.exports = router