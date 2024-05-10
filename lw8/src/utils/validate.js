function validateProductFields(actualProduct, expectedProduct) {
    const keys = Object.keys(expectedProduct)
    for (let key of keys) {
        if (actualProduct[key] !== expectedProduct[key]) {
            return false
        }
    }
    return true
}

module.exports = {
    validateProductFields
}