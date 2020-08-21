# RACV Code Challenge

## Web Application

- **Technologies and Versions Used** :

  - `NPM - v6.4.1`
  - `Node - v10.15.0`

- **Setup process** :

  - Install above mentioned dependencies.
  - use `npm install` to install project dependencies.
  - No database is used but implemented a data-store functionality to hold data and also to test application.
  - app config is set from npm scripts in `package.json` file.
  - use `npm start` to start the application on port `3006`.
  - use `npm test` to execute test cases that includes both unit tests and integration tests.
  - use `npm test:coverage` to get the code coverage, this will create a coverage folder inside project.

- **Application details** :

  - Maintained `ES6` standard for application implementation.
  - Used `Express` framework for building APIs and `Babel` for to support ES6.
  - Used `Nodemon` to detect code changes and automatic app restart.
  - Used `Jest` framework for testing the application and code coverage.
  - Used `SuperTest` library for testing the HTTP request.
  - Used `@hapi/joi` library for object schema validation.
  - Used `morgan` library for HHTP request logging on console.
  - Used `data-store` library to persist and load data.
  - Used `npm-run-all` cli tool to run multiple npm-scripts in parallel.

- **Application access** :

  - Base url for application `http://localhost:3006`

  - **Member endpoints** :

    - **GET** :

      1. `/properties` - for getting all properties

      ```
      ex:  http://localhost:3006/properties
      ```

      2. `/properties/:suburb` - for getting properties within a suburb (Suburb is case-sensitive)

      ```
      ex: http://localhost:3006/properties/Richmond
      ```

    - **POST** :

      1.  `/properties` - to create new member in database with request body as JSON object. Request body must contain `{ "address": { "street": "10 King Street", "suburb": "St Kilda", "state": "VIC", "postcode": 3090 }, "salePrice": 12345, "description": "Hello" }` all are required.

- **Note** : Postman can be used to test the application.
