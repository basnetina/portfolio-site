export function toPascalCase(text: string) {
    return text
        .trim() // Remove leading/trailing whitespace
        .split(/\s+/) // Split into words by any whitespace
        .map(word =>
            word.charAt(0).toUpperCase() + // Capitalize first letter
            word.slice(1).toLowerCase() // Lowercase remaining letters
        )
        .join(''); // Join words without spaces
}