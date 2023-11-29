const { Router } = require('express')
const CartsManagerFile = require('../managers/cartsManager')

const router = Router()
const cartService = new CartsManagerFile

router
    .get('/:cid', async(req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartService.getCartById(parseInt(cid))
            res.send({
                status: 'succes',
                playload: cart
            })
        } catch (error) {
            console.log(error)
        }

    })
    .post('/', (req, res) => {
        res.send('post de cart ')
    })
    .put('/:cid', (req, res) => {
        const { cid } = req.params
        res.send('put de cart ' + cid)
    })
    .delete('/:cid', async(req, res) => {
        try {
            const { cid } = req.params
            const result = await cartService.deleteCart(parseInt(cid))

            if (result === 'No se encontró el carrito') {
                return res.status(404).send({
                    status: 'error',
                    payload: result
                })
            }

            res.send({
                status: 'success',
                payload: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 'error',
                payload: 'Internal Server Error'
            })
        }
    })

module.exports = router