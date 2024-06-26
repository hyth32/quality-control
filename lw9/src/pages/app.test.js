const puppeteer = require('puppeteer')
const LoginPage = require('./login')
const SignupPage = require('./signup')
const AddToCart = require('./addToCart')
const CheckoutPage = require('./checkout')
const Search = require('./search')
const readJsonFromDir = require('../utils/readJsonFromDir')

const loginTestData = readJsonFromDir('../testCases/loginTestData.json')
const signupTestData = readJsonFromDir('../testCases/signupTestData.json')
const searchTestData = readJsonFromDir('../testCases/searchTestData.json')

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

    //тесты входа
    // describe('Login test', () => {
    //     loginTestData.forEach(({login, password, expected}) => {
    //         test(`Login with username "${login}" and password "${password}"`, async () => {
    //             const loginPage = new LoginPage(testPage)
    //             await loginPage.init()
    //             const isLoggedIn = await loginPage.login(login, password)
    //             const [dangerMessages, isSuccess] = await loginPage.isMessageDisplayed(isLoggedIn)
    //             const isDanger = dangerMessages.length > 0
    //             expect(!isDanger && isSuccess).toBe(expected.status)
    //             if (isDanger) {
    //                 const dangerMessage = dangerMessages[0]
    //                 expect(dangerMessage).toBe(expected.message)
    //             }
    //         })
    //     })
    // })

    //тесты регистрации
    // не забыть вернуть валидный тест (в тг)
    // describe('Sign up test', () => {
    //     signupTestData.forEach(({login, password, name, email, address, expected}) => {
    //         test(`Sign up with login "${login}" and email "${email}"`, async () => {
    //             const signupPage = new SignupPage(testPage)
    //             await signupPage.init()
    //             const isSignedUp = await signupPage.signup(login, password, name, email, address)
    //             const [dangerMessages, isSuccess] = await signupPage.isMessageDisplayed(isSignedUp)
    //             const isDanger = dangerMessages.length > 0
    //             expect(!isDanger && isSuccess).toBe(expected.status)
    //             if (isDanger) {
    //                 expect(dangerMessages).toEqual(expected.messages)
    //             }
    //         })
    //     })
    // })

    //тесты поиска
    // describe('Search test', () => {
    //     searchTestData.forEach(({ searchQuery, expected }) => {
    //         describe(`Search query: "${searchQuery}"`, () => {
    //             test('Search and attempt to add product', async () => {
    //                 const mainPage = new Search(testPage)
    //                 await mainPage.init()
    //                 const ids = await mainPage.search(searchQuery)
    //                 const isFound = ids.length > 0
    //                 expect(isFound).toBe(expected)
    //
    //                 const productId = isFound ? ids[0] : undefined
    //                 const addingPage = new AddToCart(testPage)
    //                 const isAdded = await addingPage.addProduct(productId)
    //                 const isMessageDisplayed = await addingPage.isAddedMessageDisplayed(isAdded)
    //                 expect(isMessageDisplayed).toBe(isFound)
    //             })
    //         })
    //     })
    // })

    describe('Search test', () => {
        describe(`Search query: "${'qwe'}"`, () => {
            test('Search and attempt to add product', async () => {
                const mainPage = new Search(testPage)
                await mainPage.init()
                const ids = await mainPage.search('qwe')
                const isFound = ids.length > 0
                expect(isFound).toBe(true)

                const productId = isFound ? ids[0] : undefined
                const addingPage = new AddToCart(testPage)
                const isAdded = await addingPage.addProduct(productId)
                const isMessageDisplayed = await addingPage.isAddedMessageDisplayed(isAdded)
                expect(isMessageDisplayed).toBe(isFound)
            })
        })
    })


    // тесты добавления продукта
    // describe('Add product test', () => {
    //     cartTestData.forEach(({id, expected}) => {
    //         test(`Adding product with id "${id}"`, async () => {
    //             const productsPage = new ProductsPage(testPage)
    //         })
    //     })
    //     test('Valid id', async () => {
    //         expect(true).toBe(true)
    //     })
    //
    //     test('Invalid id', async () => {
    //         expect(true).toBe(true)
    //     })
    // })

    // //тесты оформления заказа
    // describe('Checkout test', () => {
    //     describe('With user', () => {
    //         test('Checkout', async () => {
    //             expect(true).toBe(true)
    //         })
    //     })
    //
    //     describe('Without user', () => {
    //         test('Checkout (Not enough fields)', async () => {
    //             expect(true).toBe(true)
    //         })
    //
    //         //форма регистрации, ошибка - существующий пользователь
    //         test('Checkout (User exists)', async () => {
    //             expect(true).toBe(true)
    //         })
    //     })
    // })
    //
    // describe('Test with user', () => {
    //     const {login, password} = loginTestData[0]
    //
    //     //пользователь вошел
    //     describe('Logged in user', () => {
    //         test('Login', async () => {
    //             const loginPage = new LoginPage(testPage)
    //             await loginPage.init()
    //             const isLoggedIn = await loginPage.login(login, password)
    //             const [, isSuccess] = await loginPage.isMessageDisplayed(isLoggedIn)
    //             expect(isSuccess).toBe(true)
    //         })
    //
    //         //searchTestData.json с пустым и не пустым запросом
    //         //переписать search для использования в add product
    //         test('Search (non-empty)', async () => {
    //             expect(true).toBe(true)
    //         })
    //
    //         test('Add product (valid id)', async () => {
    //             const productsPage = new ProductsPage(testPage)
    //             await productsPage.init()
    //             const isAdded = await productsPage.addProduct(2)
    //             const isDisplayed = await productsPage.isAddedMessageDisplayed(isAdded)
    //             const isNavigated = await productsPage.navigateToCheckout(isDisplayed)
    //             expect(isNavigated).toBe(true)
    //         })
    //
    //         //переписать checkout для использования в зависимости от существования юзера
    //         //плюс заполнение Note textarea
    //         //добавить отдельный метод finishCheckout() с нажатием на кнопку
    //         test('Checkout', async () => {
    //             expect(true).toBe(true)
    //         })
    //     })
    //
    //     //пользователь зарегистрировался
    //     describe('New user', () => {
    //         test('Sign up', async () => {
    //             expect(true).toBe(true)
    //         })
    //
    //         test('Search (non-empty)', async () => {
    //             expect(true).toBe(true)
    //         })
    //
    //         test('Add product (valid id)', async () => {
    //             expect(true).toBe(true)
    //         })
    //
    //         test('Checkout', async () => {
    //             expect(true).toBe(true)
    //         })
    //     })
    // })
    //
    // describe('Test without user', () => {
    //     test('Search (Non-empty)', async () => {
    //         expect(true).toBe(true)
    //     })
    //
    //     test('Add product (Valid id)', async () => {
    //         expect(true).toBe(true)
    //     })
    //
    //     //тут чекаут с формой регистрации (валидные данные)
    //     test('Checkout (New user)', async () => {
    //         expect(true).toBe(true)
    //     })
    // })
})