class AuthPage {
    constructor(page) {
        this.page = page
    }

    async navigateToLoginPage() {
        await this.page.goto('http://shop.qatl.ru/user/login', {waitUntil: 'networkidle2'})
    }

    async login(login, password) {
        await this.page.type('input[name="login"]', login, {delay: 100})
        await this.page.type('input[name="password"]', password, {delay: 100})
        await this.page.click('button[type="submit"]')
    }

    async isSuccessMessageDisplayed() {
        await this.page.waitForSelector('.alert-success')
        const successElement = await this.page.evaluate(() => {
            return document.querySelector('.alert-success')
        })
        return !!successElement
    }
}

module.exports = AuthPage