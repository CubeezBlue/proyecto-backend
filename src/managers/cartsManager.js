const fs = require('node:fs')
const { pid } = require('node:process')

class CartsManagerFile {
    constructor() {
        this.path = './src/mockDB/Carts.json'

    }


    readFile = async() => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }


    createCart = async(cid) => {
        const carts = this.readFile()
        let newCart
        if (carts.length === 0) {
            newCart = { id: 1, products: [] }
        } else {
            newCart = { id: carts.length + 1, products: [] }
        }
        carts.push(newCart)
        const result = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return result

    }

    getCartById = async(cid) => {
        const carts = await this.readFile()
        const cart = carts.find(cart => cart.id === cid)
        if (!cart) {
            return 'No se encontro el carrito'
        }
        return cart
    }

    addProducToCart = async(cid, pid) => {
        const carts = await this.readFile()
        const cartIndex = carts.findIndex(cart => cart.id === cid)
        if (cartIndex != -1) {
            return 'No se encuentra el carrito'
        }
        carts[cartIndex].products = { productId: pid }
        const result = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return result
    }

    deleteCart = async(cid) => {
        try {
            let carts = await this.readFile()

            const filteredCarts = carts.filter(cart => cart.id !== cid)

            if (filteredCarts.length === carts.length) {
                return 'No se encontró el carrito'
            }

            await fs.promises.writeFile(this.path, JSON.stringify(filteredCarts, null, 2), 'utf-8')
            return 'Carrito eliminado'
        } catch (error) {
            return new Error(error)
        }
    }

}

module.exports = CartsManagerFile