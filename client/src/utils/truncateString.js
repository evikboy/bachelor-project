export const truncateString = (string, maxLength) => {
    if (string.length > maxLength) {
        return string.slice(0, maxLength) + '...'
    }
    return string
}