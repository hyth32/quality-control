const axios = require('axios');
const testData = require('../testData.json');
const {validateProductFields} = require('./utils/validate')

const BASE_URL = 'http://shop.qatl.ru/'

describe('API tests', () => {
    test('All products', async () => {
        const response = await axios.get(`${BASE_URL}/api/products`)
        expect(response.status).toBe(200)

        const products = response.data
        expect(Array.isArray(products)).toBe(true)
    })

    test('Add product', async () => {
        const response = await axios.post(`${BASE_URL}/api/addproduct`, JSON.stringify(testData.addProduct.requestBody))
        expect(response.status).toBe(200)
        const addedProduct = JSON.parse(response.config.data)
        expect(validateProductFields(addedProduct, testData.addProduct.requestBody)).toBe(true)
    })

    test('Edit product', async () => {
        const response = await axios.post(`${BASE_URL}/api/editproduct`, JSON.stringify(testData.editProduct.requestBody))
        expect(response.status).toBe(200)
        const editedProduct = JSON.parse(response.config.data)
        expect(validateProductFields(editedProduct, testData.editProduct.requestBody)).toBe(true)
    })

    test('Delete product', async () => {
        const response = await axios.post(`${BASE_URL}/api/deleteproduct?id=${testData.deleteProduct.productId}`)
        expect(response.status).toBe(200)
    })
})