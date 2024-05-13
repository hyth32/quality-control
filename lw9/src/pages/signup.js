const {fillForm} = require('../utils/fillForm')
const {getMessageStatus} = require('../utils/getMessageStatus')

class SignupPage {
    constructor(page) {
        this.page = page
    }

    async init() {
        try {
            await this.page.goto('http://shop.qatl.ru/user/signup/')
        } catch (err) {
            throw new Error(`Can't navigate to signup page: ${err}`)
        }
    }

    async signup(login, password, name, email, address) {
        const formData = {login, password, name, email, address}

        try {
            await fillForm(this.page, formData)
            await this.page.click('button[type="submit"]')
            return true
        } catch (err) {
            throw new Error(`Couldn't sign up: ${err}`)
        }
    }

    async isMessageDisplayed(isSignedUp) {
        return getMessageStatus(this.page, isSignedUp, 'signup')
    }
}

module.exports = SignupPage