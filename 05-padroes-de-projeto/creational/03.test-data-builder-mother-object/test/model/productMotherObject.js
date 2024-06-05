const ProductDataBuilder = require("./productDataBuilder");

class ProductMotherObject {
    static valid() {
        return ProductDataBuilder.aProduct().build();
    }

    static withInvalidId() {
        return ProductDataBuilder.aProduct().withInvalidId().build();
    }

    static withInvalidName() {
        return ProductDataBuilder.aProduct().withInvalidName().build();
    }
    //assim por diante
}

module.exports = ProductMotherObject;