export const lowercaseFirstLetter = (phrase: string) => {
    return phrase.charAt(0).toLowerCase() + phrase.slice(1);
};

export const capitalizeFirstLetter = (phrase: string) => {
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}