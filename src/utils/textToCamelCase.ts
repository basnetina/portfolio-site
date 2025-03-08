const textToCamelCase = (text?: string) => {
    if(text){
        return text.toLowerCase().split(' ').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }
    return ""
}

export default textToCamelCase