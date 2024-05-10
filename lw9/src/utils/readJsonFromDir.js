const fs = require('fs')
const path = require('path')

const readJsonFromDir = relativePath => {
    const rawData = fs.readFileSync(path.join(__dirname, relativePath)).toString()
    return JSON.parse(rawData)
}

module.exports = readJsonFromDir