const _ = require("lodash");

// find associated barcodes of each product and attach to catalog array
module.exports = (company) =>
  _.map(company.catalog, (catalog) => {
    const barcodes = _.chain(company)
      .get("barcodes")
      .filter((barcode) => barcode.SKU === catalog.SKU)
      .map((barcode) => barcode.Barcode)
      .value();
    return {
      ...catalog,
      barcodes,
      Source: company.name,
    };
  });
