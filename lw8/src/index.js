const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000

const BASE_URL = 'http://shop.qatl.ru/'

app.get('/all', async () => {
    const response = await axios.get(`${BASE_URL}/api/products`)
    console.log('Data quantity', response.data.length)
})

app.get('/delete', async (req) => {
    const {id} = req.params
    const response = await axios.post(`${BASE_URL}/api/deleteproduct?id=${id}`)
    console.log('Deleting status: ', response.statusText)
})

app.get('/add', async () => {
    const response = await axios.post(`${BASE_URL}/api/addproduct`, JSON.stringify(requestBody))
    console.log('Adding status: ', response.statusText)
    // console.log(response.config.data)
})

app.get('/edit', async () => {
    const response = await axios.post(`${BASE_URL}/api/editproduct`, JSON.stringify(requestBody))
    console.log('Editing status: ', response.statusText)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

const requestBody = {
    id: 9999,
    category_id: 12,
    title: 'новый продукт',
    alias: 'novyproduct-0',
    content: "текст",
    price: 100,
    old_price: 0,
    status: 1,
    keywords: 'текст',
    description: 'текст описания',
    hit: 0
}
