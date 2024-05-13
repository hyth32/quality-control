const {fillForm} = require('../utils/fillForm')
const {getMessageStatus} = require('../utils/getMessageStatus')

class LoginPage {
    constructor(page) {
        this.page = page
    }

    async init() {
        try {
            await this.page.goto('http://shop.qatl.ru/user/login')
        } catch (err) {
            throw new Error(`Can't navigate to login page: ${err}`)
        }
    }

    async login(login, password) {
        const formData = {login, password}

        try {
            await fillForm(this.page, formData)
            await this.page.click('button[type="submit"]')
            return true
        } catch (err) {
            throw new Error(`Can't log in: ${err}`)
        }
    }

    async isMessageDisplayed(isLoggedIn) {
        return getMessageStatus(this.page, isLoggedIn, 'login')
    }
}

module.exports = LoginPage