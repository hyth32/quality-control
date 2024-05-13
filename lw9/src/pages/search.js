class Search {
    constructor(page) {
        this.page = page
    }

    async navigateToMainPage() {
        try {
            await this.page.goto('http://shop.qatl.ru/')
        } catch (err) {
            throw new Error(`Can't navigate to main page: ${err}`)
        }
    }

    async search(searchQuery) {
        await this.page.type('input[name="s"]', searchQuery)
        await this.page.click('input[type="submit"]')
    }

    async getProducts() {
        return await this.page.evaluate(() => {
            const nodeList = document.querySelectorAll('.product-main')
            const nodeArray = Array.from(nodeList)
            return nodeArray.map(node => node.outerHTML)
        })
    }
}

module.exports = Search