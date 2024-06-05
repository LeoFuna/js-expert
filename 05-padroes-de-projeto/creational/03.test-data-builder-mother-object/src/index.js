/*
ProductId: should be between 2 and 20 char
Name: should be only words
Price: should be from 0 to 1000
Category: should be electronics or organic
*/

function productValidator(product) {
    const errors = [];
    if (product?.id?.length < 2 || product?.id?.length > 20) errors.push('ProductId: should be between 2 and 20 char');
    // regex for digits or non word match 
    if (product?.name?.match(/(\W|\d)/g)) errors.push('Name: should be only words');
    return {
        result: errors.length === 0,
        errors,
    }
}

module.exports = {
    productValidator
};