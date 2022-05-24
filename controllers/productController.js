const Product = require('../model/productModel')
const { getHostData } = require('../utils')
    // @desc Gets all products
    // @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
            // res.write(JSON.stringify(products))
            // res.end();
        res.end(JSON.stringify(products)) //better then above, just end the and send the response
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets single product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (product) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product)) //better then above, just end the and send the response
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product not found - 400 bad request" }))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc creates product
// @route post /api/products/
async function createProduct(req, res) {
    try {
        const body = await getHostData(req)
        const { name, description, price } = JSON.parse(body)
        const product = {
            name,
            description,
            price
        }

        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// @desc update product
// @route put /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (product) {
            const body = await getHostData(req)
            const { name, description, price } = JSON.parse(body)
            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct))
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product not found - 400 bad request" }))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc deletes single product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)
        if (product) {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product # ${id} is deleted` })) //better then above, just end the and send the response
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: "Product not found - 400 bad request" }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct }