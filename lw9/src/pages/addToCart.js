class AddToCart {
    constructor(page) {
        this.page = page
    }

    async screenshot(path, fullPage) {
        await this.page.screenshot({path: path, fullPage: fullPage})
    }

    async addProduct(id) {
        if (id && id > 0) {
            try {
                const addButton = await this.page.evaluate(() => {
                    return document.querySelector(`a[data-id="${id}"]`)
                })
                if (!!addButton) {
                    await this.page.click(addButton)
                    return true
                }
                return false
            } catch (err) {
                throw new Error(`Can't click on add button: ${err}`)
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
            throw new Error(`Success message isn't displayed: ${err}`)
        }
    }

    async navigateToCheckout(isAddedMessageDisplayed) {
        if (!isAddedMessageDisplayed) {
            return false
        }
        try {
            await Promise.all([
                this.page.waitForNavigation(),
                this.page.click('a[href="cart/view"]')
            ])
            return true
        } catch (err) {
            throw new Error(`Can't navigate to checkout page: ${err}`)
        }
    }
}

module.exports = AddToCart