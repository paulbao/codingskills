const attachBarcodes = require("./attachBarcodes");

const company = {
    barcodes: [
        {
          SupplierID: '00001',
          SKU: '999-vyk-317',
          Barcode: 'z2783613083817'
        },
        {
          SupplierID: '00001',
          SKU: '999-vyk-317',
          Barcode: 'n7405223693844'
        },
        {
          SupplierID: '00005',
          SKU: '999-epd-782',
          Barcode: 'b3343396882074'
        }
      ],
    catalog: [
        {
          SKU: '999-vyk-317',
          Description: 'Walkers Special Old Whiskey test'
        },
        {
          SKU: '999-epd-782',
          Description: 'Carbonated Water - Lemon Lime'
        },
        {
            SKU: 'does not exist',
            Description: 'Carbonated Water - Lemon Lime'
        }
      ],
      name: 'CompanyName'
};

describe("attachBarcodes", () => {

    it("should attach a barcodes arrray that found by SKKU for each product", () => {
        const expected = [
            {
                SKU: '999-vyk-317',
                Description: 'Walkers Special Old Whiskey test',
                Source: 'CompanyName',
                barcodes: ['z2783613083817', 'n7405223693844']
            },
            {
                SKU: '999-epd-782',
                Description: 'Carbonated Water - Lemon Lime',
                Source: 'CompanyName',
                barcodes: ['b3343396882074']
            },
            {
                SKU: 'does not exist',
                Description: 'Carbonated Water - Lemon Lime',
                Source: 'CompanyName',
                barcodes: []
            }
        ];
        const actual = attachBarcodes(company);

        expect(actual).toEqual(expected);
    });
});
