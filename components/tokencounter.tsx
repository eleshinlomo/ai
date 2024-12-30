
export const countTokens = (text: string) => {
    const tokens = text.split(/\s+/);
    return tokens.length;
}
