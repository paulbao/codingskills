const _ = require("lodash");
const csv = require('csvtojson');
const fs = require("fs");

const INPUT = "./input/"; // input folder name
const NUM_OF_FILES = 6; // we suppose to receive 6 files, 3 for each
const COMPANY_NAMES = ['A', 'B']; //Company names to process
const COMPANY_ASSETS = ['barcodes', 'catalog', 'suppliers'];

// Read all csv files from input folder
const readCompanyData = async () => {
    const files = await fs.readdirSync(INPUT);

    if (files.length < NUM_OF_FILES) {
        throw new Error(`Not enough input files. Expected ${NUM_OF_FILES}, found ${files.length}`)
    }
    const companyA = {};
    const companyB = {};
    for (const fileFullName of files) {
        const company = splitFileName(fileFullName);
        if (_.isNull(company)) {
            continue;
        }

        const csvFilePath = INPUT + fileFullName;
        const { companyName, companyAsset } = company;
        if (companyName === 'A') {
            companyA[companyAsset] = await csv().fromFile(csvFilePath);
        } else if (companyName === 'B') {
            companyB[companyAsset] = await csv().fromFile(csvFilePath);
        } else {
            continue;
        }
    }
    // make sure that each company has succesfully read all neceaary data
    if (!_.isEqual(_.keys(companyA), COMPANY_ASSETS) || !_.isEqual(_.keys(companyB), COMPANY_ASSETS)) {
        console.warn('Company assets does not match')
        return;
    }

    // attach company name to each company
    companyA.name = 'A';
    companyB.name = 'B';

    return { companyA, companyB };
}

// validate file name and split it to company name and company asset
const splitFileName = (fileFullName) => {
    // Ignore files that are not csv fromat
    if (!_.endsWith(fileFullName, '.csv')) {
        return null;
    }
    const fileName = _.trimEnd(fileFullName, '.csv');
    const fileNameWords = _.words(fileName);

    if (fileNameWords.length !== 2) {
        return null;
    }
    const companyName = fileNameWords[1];
    if (!_.includes(COMPANY_NAMES, companyName)) {
        return null;
    }

    const companyAsset = fileNameWords[0];
    if (!_.includes(COMPANY_ASSETS, companyAsset)) {
        return null;
    }

    return { companyName, companyAsset };
}

// export splitFileName function for test purpose
module.exports = { readCompanyData, splitFileName };