async function fillForm(page, formData) {
    for (const [fieldName, value] of Object.entries(formData)) {
        if (!value) {
            return false
        }
        try {
            await page.type(`input[name="${fieldName}"]`, value)
        } catch (err) {
            throw new Error(`Failed to fill form: ${err}`)
        }
    }
}

module.exports = {fillForm}