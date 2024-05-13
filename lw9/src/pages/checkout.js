class CheckoutPage {
    constructor(page) {
        this.page = page
    }

    async checkout(isNavigated) {
        if (!isNavigated) {
            return false
        }
        try {
            await this.page.click('button[type="submit"]')
            return true
        } catch (err) {
            throw new Error(`Error occurred: ${err}`)
        }
    }
}

module.exports = CheckoutPage