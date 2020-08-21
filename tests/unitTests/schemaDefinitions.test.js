import * as Schemas from "../../src/utilities/schemaDefinitions";

describe("Validation Schema Suit", () => {
  const property = {
    address: {
      street: "10 King Street",
      suburb: "St Kilda",
      state: "VIC",
      postcode: 3090,
    },
    salePrice: 12345,
    description: "Hello",
  };

  const propertyWithNoSuburb = {
    address: {
      street: "414 Ballarat Road",
      state: "VIC",
      postcode: 3100,
    },
    salePrice: 50000,
    description: "Property with no suburb",
  };

  it("Test successfully Property object Validation", () => {
    let res = Schemas.propertyObjValidation(property);
    expect(res).toBe(null);
  });

  it("Test error validation with missing suburb", () => {
    let res = Schemas.propertyObjValidation(propertyWithNoSuburb);
    expect(res).toHaveProperty("name", "ValidationError");
    expect(res.details[0].message).toBe('"suburb" is required');
  });
});
