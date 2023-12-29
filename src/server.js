const express = require('express');
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const { connect } = require('mongoose')
const app = express();
const connectDb = async() => {
    await connect('mongodb+srv://cubeezblue:Memito98@cluster0.eret6dw.mongodb.net/Ecommerce?retryWrites=true&w=majority')
    console.log("Base de dato conectada")
}
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);


app.listen(8080, () => {
    console.log("Hola Uacho")
})