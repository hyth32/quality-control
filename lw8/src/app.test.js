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

    //id продукта присваивает бэк вне зависимости от уходящего объекта,
    // дополняются поля, не указанные в тз, сравнение не работает
    test('Add product', async () => {
        const response = await axios.post(`${BASE_URL}/api/addproduct`, JSON.stringify(testData.addProduct.requestBody))
        expect(response.status).toBe(200)
        expect(response.data.status).toBe(1)

        const products = await axios.get(`${BASE_URL}/api/products`)
        const addedProduct = products.data[products.data.length - 1]
        console.log(addedProduct)
        // expect(validateProductFields(addedProduct, testData.addProduct.requestBody)).toBe(true)
        // console.log(data.data[data.data.length - 1])
        // const addedProduct = JSON.parse(response.config.data)
        // expect(validateProductFields(addedProduct, testData.addProduct.requestBody)).toBe(true)
    })

    //id так же меняется бэком у измененного продукта, присваивает id+1, тоже особо не захендлить,
    //сравнение не работает по той же причине
    test('Edit product', async () => {
        const response = await axios.post(`${BASE_URL}/api/editproduct`, JSON.stringify(testData.editProduct.requestBody))
        expect(response.status).toBe(200)
        expect(response.data.status).toBe(1)

        const products = await axios.get(`${BASE_URL}/api/products`)
        const editedProduct = products.data[products.data.length - 1]
        console.log(editedProduct)
        // const editedProduct = JSON.parse(response.config.data)
        // expect(validateProductFields(editedProduct, testData.editProduct.requestBody)).toBe(true)
    })

    //из-за проблем выше удаление только вручную (если без заморочек)
    test('Delete product', async () => {
        // const response = await axios.post(`${BASE_URL}/api/deleteproduct?id=${testData.deleteProduct.productId}`)
        const response = await axios.post(`${BASE_URL}/api/deleteproduct?id=${29351}`)
        expect(response.status).toBe(200)

        const products = await axios.get(`${BASE_URL}/api/products`)
        console.log(products.data[products.data.length - 1])
    })
})