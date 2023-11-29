const fs = require('node:fs')

const path = './src/mockDB/Productos.json'

class ProductManagerFile {
    constructor() {
        this.path = path
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

    getProducts = async() => {
        try {
            return await this.readFile()
        } catch (error) {
            return 'No hay productos'
        }
    }


    getProduct = async(id) => {
        try {
            const products = await this.readFile()
            if (!products) return 'No hay productos'
            return products.find(product => product.id === id)
        } catch (error) {
            return new Error(error)
        }
    }


    addProduct = async(newItem) => {
        try {

            let products = await this.readFile()
            const productDb = products.find(product => product.code === newItem.code)
            console.log(productDb)
            if (productDb) {
                return `Se encuenta el producto`
            }


            if (products.length === 0) {
                newItem.id = 1
                products.push(newItem)
            } else {
                products = [...products, {...newItem, id: products.length + 1 }]
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')

            return 'Producto agregado'
        } catch (error) {
            return new Error(error)
        }
    }

    async update(pid, updateToProduct) {
        let products = await this.readFile()

        const productIndex = products.findIndex(product => pid === product.id)
        if (productIndex !== -1) { // ! = =
            products[productIndex] = updateToProduct
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
        return 'producto acualizado'
    }

    deleteProduct = async(id) => {
        try {
            let products = await this.readFile()

            const filteredProducts = products.filter(product => product.id !== id)

            if (filteredProducts.length === products.length) {
                return 'No se encontró el producto'
            }

            await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts, null, 2), 'utf-8')
            return 'Producto eliminado'
        } catch (error) {
            return new Error(error)
        }
    }

}


module.exports = ProductManagerFile