/**
 * generate random string (uuid-like)
 */
export function generateRandomID(length: number): string {
    const randomInts: Uint8Array = new Uint8Array((length || 40) / 2)
    window.crypto.getRandomValues(randomInts)
    return Array.from(randomInts, decimalToHex).join('')
}

/**
 * convert decimal nimber to hex code strings
 */
function decimalToHex(decimal: number): string {
    return ('0' + decimal.toString(16)).substr(-2)
}

