class ProductsPage {
    constructor(page) {
        this.page = page
    }

    async navigateToProductsPage() {
        try {
            await this.page.goto('http://shop.qatl.ru/', {waitUntil: 'networkidle2'})
        } catch (err) {
            console.error(err)
        }
    }

    async addProduct(id) {
        if (id > 0) {
            try {
                await this.page.click(`a[data-id="${id}"]`)
                return true
            } catch (err) {
                console.error(err)
            }
        }
        return false
    }

    async isAddedMessageDisplayed(isProductAdded) {
        if (!isProductAdded) {
            return false
        }
        try {
            await this.page.waitForSelector('.in>.modal-dialog')
            const successElement = await this.page.evaluate(() => {
                return document.querySelector('.in>.modal-dialog')
            })
            return !!successElement
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = ProductsPage