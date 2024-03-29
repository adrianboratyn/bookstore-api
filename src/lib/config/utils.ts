export const toBoolean = (value?: any) => {
    if (typeof value === 'boolean') {
        return value
    }

    return Boolean(value && (value === 'true' || value === '1'))
}
