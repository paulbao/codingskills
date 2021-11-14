const findCommonBarcodes = require("./findCommonBarcodes");


describe("findCommonBarcodes", () => {

    it("should return a barcode arry that both companies have", () => {
        const companies = {
            companyA: {
                barcodes: [
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'u5160747892301'
                    },
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'fakeBarcode'
                    },
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'l7342139757479'
                    }
                ]
            },
            companyB: {
                barcodes: [
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'b4059282550570'
                    },
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'fakeBarcode'
                    },
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'b3343396882074'
                    }
                ]
            }
        };
        const expected = ['fakeBarcode'];
        const actual = findCommonBarcodes(companies);

        expect(actual).toEqual(expected);
    });

    it("should return an empty arry if no barcode matches", () => {
        const companies = {
            companyA: {
                barcodes: [
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'u5160747892301'
                    },
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'x0126648261918'
                    },
                    {
                        SupplierID: '00003',
                        SKU: '165-rcy-650',
                        Barcode: 'l7342139757479'
                    }
                ]
            },
            companyB: {
                barcodes: [
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'b4059282550570'
                    },
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'x2338856941909'
                    },
                    {
                        SupplierID: '00005',
                        SKU: '999-epd-782',
                        Barcode: 'b3343396882074'
                    }
                ]
            }
        };
        const expected = [];
        const actual = findCommonBarcodes(companies);

        expect(actual).toEqual(expected);
    });
});
