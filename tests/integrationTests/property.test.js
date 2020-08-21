import request from "supertest";
import server from "../../src/app";
import dataStore from "data-store";

const store = dataStore({
  path: process.cwd() + "/tests/dataDumps/property.json",
});

const property1 = {
  address: {
    street: "10 King Street",
    suburb: "St Kilda",
    state: "VIC",
    postcode: 3090,
  },
  salePrice: 12345,
  description: "Hello",
};

const property2 = {
  address: {
    street: "10 King Street",
    suburb: "Richmond",
    state: "VIC",
    postcode: 3000,
  },
  salePrice: 12345,
  description: "Hello",
};
const property3 = {
  address: {
    street: "33 Elizabeth Street",
    suburb: "Richmond",
    state: "VIC",
    postcode: 3000,
  },
  salePrice: 45646,
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

describe("Testing Property Search enpoints", () => {
  beforeAll(() => {
    store.union(property1.address.suburb, property1);
    store.union(property2.address.suburb, property2);
    store.union(property3.address.suburb, property3);
  }, 2000);
  afterAll(() => {
    store.unlink();
  });
  describe("GET /properties", () => {
    it("Should successfully receive all available properties", async () => {
      const res = await request(server).get("/properties");
      expect(res.status).toBe(200);
    });

    it("Should successfully receive all available properties by suburb and also checks the avg price criteria of the property", async () => {
      const res = await request(server).get("/properties/Richmond");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].address.street).toEqual("10 King Street");
      expect(res.body[0].note).toEqual(
        "Property is below the avg price for properties in suburb"
      );
      expect(res.body[1].address.street).toEqual("33 Elizabeth Street");
      expect(res.body[1].note).toEqual(
        "Property is above the avg price for properties in suburb"
      );
    });

    it("Should receive 404 eror when requested  with no properties available in the suburb", async () => {
      const res = await request(server).get("/properties/Laverton");
      expect(res.status).toBe(404);
      expect(res.text).toBe("No property available with the requested suburb");
    });
  });

  describe("POST /properties", () => {
    it("Should successfully add new property", async () => {
      const res = await request(server)
        .post("/properties")
        .send(property1)
        .set("Content-Type", "application/json");
      expect(res.status).toBe(201);
    });

    it("Should send error with message as suburb is required", async () => {
      const res = await request(server)
        .post("/properties")
        .send(propertyWithNoSuburb)
        .set("Content-Type", "application/json");
      expect(res.status).toBe(400);
      expect(res.text).toBe('"suburb" is required');
    });
  });
});
