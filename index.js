const _ = require("lodash");

const { readCompanyData } = require("./utils/readCompanyData");
const findCommonBarcodes = require("./utils/findCommonBarcodes");
const attachBarcodes = require("./utils/attachBarcodes");
const mergeProducts = require("./utils/mergeProducts");
const exportToCsv = require("./utils/exportToCsv");

const run = async () => {
  try {
    const companies = await readCompanyData();

    const companyBProductsWithBarcodes = attachBarcodes(companies.companyB);

    const commonBarcodes = findCommonBarcodes(companies);

    const mergedProducts = mergeProducts(
      companies.companyA,
      companyBProductsWithBarcodes,
      commonBarcodes
    );

    exportToCsv(mergedProducts);
    console.log("Please check the result file in output folder.");
  } catch (ex) {
    console.error(ex);
  }
};

run();
