async function getMessageStatus(page, actionStatus, type) {
    if (!actionStatus) {
        return [[], false]
    }
    try {
        return await page.evaluate((type) => {
            const dangerElement = document.querySelector('.alert-danger')
            const successElement = document.querySelector('.alert-success')

            const dangerMessages = dangerElement
                ? (type === 'login'
                    ? [dangerElement.textContent.trim()]
                    : Array.from(dangerElement.querySelectorAll('li'))
                        .map(li => li.textContent.trim()))
                : []

            const isSuccess = !!successElement

            return [dangerMessages, isSuccess]
        }, type)
    } catch (err) {
        throw new Error(`Can't get message status: ${err}`)
    }
}

module.exports = {getMessageStatus}