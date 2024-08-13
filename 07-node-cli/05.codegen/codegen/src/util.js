export default class Util {
    static #transform({ str: [first, ...rest], upperCase = true }) {
        const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();
        return [firstLetter, ...rest].join('');
    }
    static upperCaseFirstLetter(str) {
        if (!str) return '';
        return this.#transform({ str, upperCase: true });
    }

    static lowerCaseFirstLetter(str) {
        if (!str) return '';
        return this.#transform({ str, upperCase: false });
    }
}