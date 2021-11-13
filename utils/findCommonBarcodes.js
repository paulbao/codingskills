const _ = require("lodash");

// find same barcords that exists in both companies
module.exports = companies => _.map(
    _.intersectionWith(
        companies.companyA.barcodes, companies.companyB.barcodes,
        (barcodeA, barcodeB) => (barcodeA.Barcode == barcodeB.Barcode)
    ), barcodeObj => barcodeObj.Barcode
)