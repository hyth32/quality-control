class AuthPage {
    constructor(page) {
        this.page = page
    }

    async navigateToLoginPage() {
        try {
            await this.page.goto('http://shop.qatl.ru/user/login', {waitUntil: 'networkidle2'})
        } catch (err) {
            console.error(err)
        }
    }

    async login(login, password) {
        if (!login || !password) {
            return
        }
        try {
            await this.page.type('input[name="login"]', login, {delay: 100})
            await this.page.type('input[name="password"]', password, {delay: 100})
            await this.page.click('button[type="submit"]')
        } catch (err) {
            console.error(err)
        }
    }

    async isSuccessMessageDisplayed() {
        try {
            await this.page.waitForSelector('.alert-success')
            const successElement = await this.page.evaluate(() => {
                return document.querySelector('.alert-success')
            })
            return !!successElement
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = AuthPage