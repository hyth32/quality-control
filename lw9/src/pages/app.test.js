const puppeteer = require('puppeteer')
const AuthPage = require('./auth')
const readJsonFromDir = require('../utils/readJsonFromDir')

const authTestData = readJsonFromDir('../testCases/authTestData.json')

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
        expect(isDisplayed).toBe(true)
    })
})