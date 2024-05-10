const puppeteer = require('puppeteer')
const AuthPage = require('./auth')
const ProductsPage = require('./addToCart')
const CheckoutPage = require('./checkout')
const readJsonFromDir = require('../utils/readJsonFromDir')

const authTestData = readJsonFromDir('../testCases/authTestData.json')
const cartTestData = readJsonFromDir('../testCases/cartTestData.json')

describe('UI Test', () => {
    let browser
    let testPage

    beforeAll(async () => {
        browser = await puppeteer.launch()
        testPage = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    test('login', async () => {
        const loginPage = new AuthPage(testPage)
        await loginPage.navigateToLoginPage()
        await loginPage.login(authTestData.users[0].login, authTestData.users[0].password)
        const isDisplayed = await loginPage.isSuccessMessageDisplayed()
        expect(isDisplayed).toBe(authTestData.users[0].expect)
    })

    test('addToCart', async () => {
        const productsPage = new ProductsPage(testPage)
        await productsPage.navigateToProductsPage()
        const isAdded = await productsPage.addProduct(cartTestData[2].id)
        const isDisplayed = await productsPage.isAddedMessageDisplayed(isAdded)
        expect(isAdded).toBe(cartTestData[2].expect)
        expect(isDisplayed).toBe(cartTestData[2].expect)
    })

    test('addToCart and checkout', async () => {
        const productsPage = new ProductsPage(testPage)
        await productsPage.navigateToProductsPage()
        const isAdded = await productsPage.addProduct(cartTestData[1].id)
        const isDisplayed = await productsPage.isAddedMessageDisplayed(isAdded)
        expect(isAdded).toBe(cartTestData[1].expect)
        expect(isDisplayed).toBe(cartTestData[1].expect)

        const checkoutPage = new CheckoutPage(testPage)
        await checkoutPage.navigateToCheckout()
        const isSuccess = await checkoutPage.checkout()
        expect(isSuccess).toBe(true)
    })
})