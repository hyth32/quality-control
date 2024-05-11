const axios = require('axios')

async function getLatestProduct(url){
    const {data} = await axios.get(`${url}/api/products`)
    return data[data.length - 1]
}

function validateProductFields(actualProduct, expectedProduct) {
    const keys = Object.keys(expectedProduct)
    const ignoredKeys = ['id', 'alias', 'img', 'cat']

    for (let key of keys) {
        if (!ignoredKeys.includes(key) && String(actualProduct[key]) !== String(expectedProduct[key])) {
            console.log(`Key ${key} does not match. Expected: ${expectedProduct[key]}, but got: ${actualProduct[key]}`);
            return false
        }
    }
    return true
}

async function validateProduct(testData, actionType, url) {
    const latestProduct = await getLatestProduct(url)
    return validateProductFields(testData[actionType], latestProduct)
}

module.exports = {
    validateProduct
}