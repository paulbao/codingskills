const _ = require("lodash");

// Merge both company products
module.exports = (companyA, companyBProductsWithBarcodes, commonBarcodes) => {
  const companyAProducts = _.chain(companyA)
    .get("catalog")
    .map((product) => {
      // find all the barcodes associated to this product
      const barcodes = _.chain(companyA)
        .get("barcodes")
        .filter((barcode) => barcode.SKU === product.SKU)
        .map((barcode) => barcode.Barcode)
        .value();
      const companyCommonBarcods = _.intersection(commonBarcodes, barcodes);
      // Remove duplicated product from company B
      if (companyCommonBarcods.length > 0) {
        _.remove(
          companyBProductsWithBarcodes,
          (companyBProductWithBarcodes) =>
            _.intersection(
              companyCommonBarcods,
              companyBProductWithBarcodes.barcodes
            ).length > 0
        );
      }
      return {
        ...product,
        Source: companyA.name,
      };
    })
    .value();

  // remove barcodes
  const companyBProducts = _.map(
    companyBProductsWithBarcodes,
    (productWithBarcodes) => ({
      SKU: productWithBarcodes.SKU,
      Description: productWithBarcodes.Description,
      Source: productWithBarcodes.Source,
    })
  );

  return _.union(companyAProducts, companyBProducts);
};
