async function screenshot(page, path, fullPage) {
    await page.screenshot({path: path, fullPage: fullPage})
}

module.exports = {screenshot}