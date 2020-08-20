import * as PropertyModel from "../db/models/property";
// const store = require('data-store')({ path: process.cwd() + '/foo.json' });
import dataStore from "data-store";

const store = dataStore({ path: process.cwd() + "/src/db/data/property.json" });

export async function create(obj) {
  try {
    // let property = await PropertyModel.createProperty(obj);
    let property = store.union(obj.address.suburb, obj);
    return property;
  } catch (e) {
    return e;
  }
}

export async function getAll() {
  try {
    // let members = await PropertyModel.getPropertys();
    let properties = store.get();
    return properties;
  } catch (e) {
    return e;
  }
}

export async function getProperty(suburb) {
  try {
    let properties = store.get(suburb);
    let value = 0;
    let count = 0;
    if (properties && properties.length > 0) {
      properties.forEach((property) => {
        value += parseInt(property.salePrice);
        count++;
      });
      const avgPrice = value / count;
      properties.forEach((property) => {
        property.note =
          property.salePrice > avgPrice
            ? `Property is above the avg price for properties in suburb`
            : property.salePrice < avgPrice
            ? `Property is below the avg price for properties in suburb`
            : `Property is equal to the avg price for properties in suburb`;
      });
      console.log(`Price Avg:${avgPrice}`);
      console.log(properties);
      return properties;
    } else {
      return {};
    }
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let property = await PropertyModel.deleteProperty(id);
    let reward = await PropertyModel.deleteRewardsByProperty(id);
    return property;
  } catch (e) {
    return e;
  }
}
