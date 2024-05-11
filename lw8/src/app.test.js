const axios = require('axios');
const testData = require('../testData.json');
const {validateProduct} = require('./utils/validate')

const BASE_URL = 'http://shop.qatl.ru/'

describe('API tests', () => {
    let prodId

    test('All products', async () => {
        const {status, data} = await axios.get(`${BASE_URL}/api/products`)
        expect(status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })

    test('Add product', async () => {
        const {data: {id}, status} = await axios.post(`${BASE_URL}/api/addproduct`, testData.addProduct)
        expect(status).toBe(200)
        prodId = id

        expect(await validateProduct(testData, 'addProduct', BASE_URL)).toBe(true)
    })

    test('Edit product', async () => {
        const {status} = await axios.post(`${BASE_URL}/api/editproduct`, {...testData.editProduct, id: prodId})
        expect(status).toBe(200)
        expect(await validateProduct(testData, 'editProduct', BASE_URL)).toBe(true)
    })

    test('Delete product', async () => {
        const {status} = await axios.post(`${BASE_URL}/api/deleteproduct?id=${prodId}`)
        expect(status).toBe(200)
    })
})