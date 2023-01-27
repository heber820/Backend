import { Router } from 'express'
import {ProductManager} from '../src/productManager.js'
import socketServer from "../src/app.js";

const viewsRouter = Router()
const productManager = new ProductManager('../src/archivos/products.json') 

viewsRouter.get('/',async(req,res)=>{
  const products = await productManager.getProducts('max')
    res.render('home', {products})
})


viewsRouter.get('/realtimeproducts',async (req,res)=>{
  const products = await productManager.getProducts('max')
  socketServer.on('connection', (socket)=>{
    socket.emit('products', products)
  })
    res.render('realTimeProducts', {products})
})

viewsRouter.post('/realtimeproducts', async(req, res)=>{
  try {
    const product = await req.body
    console.clear()
    // console.log('product:',product)
    await productManager.addProduct(product)
    // console.log('addNewProduct:',addNewProduct)
    const products = await productManager.getProducts('max')
    console.log('product:',products)
    socketServer.sockets.emit('products', products)
  // res.render('realTimeProducts', {products})
  } catch (error) {
    return error
  }
})


export default viewsRouter