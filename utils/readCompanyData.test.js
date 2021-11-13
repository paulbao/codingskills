const { readCompanyData, splitFileName } = require("./readCompanyData");


describe("readCompanyData", () => {
    it("should read both companies data from csv files", async () => {
        const companies = await readCompanyData();

        expect(companies).toEqual(
            expect.objectContaining({
                companyA: expect.objectContaining({
                    name: 'A',
                    barcodes: expect.arrayContaining([]),
                    catalog: expect.arrayContaining([]),
                    suppliers: expect.arrayContaining([])
                }),
                companyB: expect.objectContaining({
                    name: 'B',
                    barcodes: expect.arrayContaining([]),
                    catalog: expect.arrayContaining([]),
                    suppliers: expect.arrayContaining([])
                })
            })
        );
    });
});

describe("splitFileName", () => {
    it("should return null if it is not csv file", () => {
        const result = splitFileName('foo.bar');

        expect(result).toBeNull();
    });

    it("should return null if the words length is not 2", () => {
        const result = splitFileName('foo.csv');

        expect(result).toBeNull();
    });

    it("should return null if the company name is not valid", () => {
        const result = splitFileName('catalogBar.csv');

        expect(result).toBeNull();
    });

    it("should return null if the company name is not valid", () => {
        const result = splitFileName('fooBar.csv');

        expect(result).toBeNull();
    });

    it("should return correct company information", () => {
        const expected = {
            companyName: 'A',
            companyAsset: 'catalog'
        };
        const result = splitFileName('catalogA.csv');

        expect(result).toEqual(expected);
    });
});