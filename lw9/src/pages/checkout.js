class CheckoutPage {
    constructor(page) {
        this.page = page
    }

    async navigateToCheckout() {
        try {
            await this.page.goto('http://shop.qatl.ru/cart/view', {waitUntil: 'networkidle2'})
        } catch (err) {
            console.error(err)
        }
    }

    async checkout() {
        try {
            await this.page.click('button[type="submit"]')
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }
}

module.exports = CheckoutPage