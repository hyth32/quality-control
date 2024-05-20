class MainPage {
    constructor(page) {
        this.page = page
    }

    async screenshot(path) {
        await this.page.screenshot({path: path})
    }

    async init() {
        try {
            await this.page.goto('http://shop.qatl.ru/')
        } catch (err) {
            throw new Error(`Can't navigate to main page: ${err}`)
        }
    }

    async search(searchQuery) {
        await this.page.type('input[name="s"]', searchQuery)
        await this.page.click('input[type="submit"]')
        return await this.page.evaluate(() => {
            const nodeList = document.querySelectorAll('.product-main')
            const nodeArray = Array.from(nodeList)
            return nodeArray.map(node => {
                const linkElement = node.querySelector('a.add-to-cart-link')
                return linkElement
                    ? linkElement.getAttribute('data-id')
                    : null
            }).filter(id => id !== null)
        })
    }
}

module.exports = MainPage