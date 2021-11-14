const _ = require("lodash");
const mergeProducts = require("./mergeProducts");

const companyA = {
  barcodes: [
    {
      SupplierID: "00001",
      SKU: "aaa-vyk-317",
      Barcode: "z2783613083817",
    },
    {
      SupplierID: "00001",
      SKU: "aaa-vyk-317",
      Barcode: "n7405223693844",
    },
    {
      SupplierID: "00005",
      SKU: "aaa-epd-782",
      Barcode: "b3343396882074",
    },
  ],
  catalog: [
    {
      SKU: "aaa-vyk-317",
      Description: "Walkers Special Old Whiskey test",
    },
    {
      SKU: "aaa-epd-782",
      Description: "Carbonated Water - Lemon Lime",
    },
  ],
  name: "A",
};

var companyBProductsWithBarcodes;

describe("mergeProducts", () => {
  beforeEach(() => {
    companyBProductsWithBarcodes = [
      {
        SKU: "bbb-vyk-317",
        Description: "Walkers Special Old Whiskey test",
        Source: "B",
        barcodes: ["z2783613083817", "n7405223693844"],
      },
      {
        SKU: "bbb-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "B",
        barcodes: ["b3343396882074"],
      },
    ];
  });
  it("should return only pruducts of company A if all products are duplicated", () => {
    const commonBarcodes = [
      "z2783613083817",
      "n7405223693844",
      "b3343396882074",
    ];
    const expected = [
      {
        SKU: "aaa-vyk-317",
        Description: "Walkers Special Old Whiskey test",
        Source: "A",
      },
      {
        SKU: "aaa-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "A",
      },
    ];
    const actual = mergeProducts(
      companyA,
      companyBProductsWithBarcodes,
      commonBarcodes
    );

    expect(actual).toEqual(expected);
  });

  it("should return both compay pruducts if there are no same barcode", () => {
    const commonBarcodes = [];
    const companyB = _.map(companyBProductsWithBarcodes, (product) => ({
      ...product,
      barcodes: [],
    }));
    const expected = [
      {
        SKU: "aaa-vyk-317",
        Description: "Walkers Special Old Whiskey test",
        Source: "A",
      },
      {
        SKU: "aaa-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "A",
      },
      {
        SKU: "bbb-vyk-317",
        Description: "Walkers Special Old Whiskey test",
        Source: "B",
      },
      {
        SKU: "bbb-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "B",
      },
    ];
    const actual = mergeProducts(companyA, companyB, commonBarcodes);

    expect(actual).toEqual(expected);
  });

  it("should merge all company products without duplicating products", () => {
    const commonBarcodes = ["z2783613083817", "n7405223693844"];
    const companyB = _.map(companyBProductsWithBarcodes, (product) => {
      if (product.SKU === "bbb-vyk-317") {
        return product;
      }
      return { ...product, barcodes: [] };
    });
    const expected = [
      {
        SKU: "aaa-vyk-317",
        Description: "Walkers Special Old Whiskey test",
        Source: "A",
      },
      {
        SKU: "aaa-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "A",
      },
      {
        SKU: "bbb-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "B",
      },
    ];
    const actual = mergeProducts(companyA, companyB, commonBarcodes);

    expect(actual).toEqual(expected);
  });
});
