import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as PropertyController from "../controllers/property";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

router.get(
  "/properties",
  asyncCallbackMiddleware(async (req, res) => {
    let properties = await PropertyController.getAll();
    if (properties === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (properties && properties.length < 1) {
      res.status(404).send(`No properties available.`);
    } else {
      res.status(200).send(properties);
    }
  })
);

router.get(
  "/properties/:suburb",
  asyncCallbackMiddleware(async (req, res) => {
    let suburb = req.params.suburb;
    const property = await PropertyController.getProperty(suburb);
    if (Object.keys(property).length === 0) {
      res.status(404).send(`No property available with the requested ID`);
    } else {
      res.status(200).send(property);
    }
  })
);

router.post(
  "/properties",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.propertyObjValidation(req.body);
    if (error !== null) {
      return res.status(400).send(error.details[0].message);
    }
    let property = await PropertyController.create(req.body);
    if (typeof property === "error") {
      return res.status(400).send("Bad Request");
    } else {
      return res.status(201).send("Property created Successfully");
    }
  })
);

export default router;
