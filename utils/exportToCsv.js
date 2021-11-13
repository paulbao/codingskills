const path = require("path");
const ObjectsToCsv = require('objects-to-csv');

// export result to a csv file
module.exports = async (result) => {
    const filePath = path.join(process.cwd(), "output", "result_output.csv");
    const csv = new ObjectsToCsv(result);
    await csv.toDisk(filePath);
};