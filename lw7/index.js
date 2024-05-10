const express = require('express')
const axios = require('axios')
const nock = require('nock')

const app = express()
const port = 3000

nock('http://api.exchangeratesapi.io')
    .persist()
    .get('/latest')
    .query(true)
    .reply(200, {
        rates: {
            USD: 1.0,
            EUR: 0.85,
            RUB: 80
        },
        base: 'USD'
    })

app.get('/currency/:base/:target', async (req, res) => {
    const {base, target} = req.params
    try {
        const response = await axios.get(`http://api.exchangeratesapi.io/latest?base=${base}`)
        const rate = response.data.rates[target]
        if (rate) {
            res.json({rate})
        } else {
            res.status(400).json({error: 'Invalid target currency'})
        }
    } catch (err) {
        res.status(500).json({error: 'Error fetching rates'})
    }
})

app.listen(port, () => {
    console.log(`Mock currency server is running at http://localhost:${port}`)
})