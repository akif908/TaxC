export const toBanglaNumber = (num) => {
    if (num === null || num === undefined) return '';
    const vnNum = num.toString();
    const map = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯'
    };
    return vnNum.replace(/[0-9]/g, (match) => map[match]);
};
