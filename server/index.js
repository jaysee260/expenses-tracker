"use strict";

// Core dependencies
const express = require("express");
const bodyParser = require("body-parser");
const plaid = require("plaid");

// Initialize Server Set Up
const util = require('util');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false 
}));
app.set("view engine", "ejs");


// Initialize Plaid client
// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
var plaidConfig = require("../config/config.json").plaid;
var plaidClient = new plaid.Client(
  plaidConfig.clientId,
  plaidConfig.secret,
  plaidConfig.publicKey,
  plaid.environments[plaidConfig.envs.sandbox],
  {version: '2018-05-22'}
);

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;


// Endpoints Catalog
var homeController = require("./controllers/homeController");
var plaidController = require("./controllers/plaidController");

app.get("/", homeController.index);

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
// app.post('/get_access_token', plaidController.getAccessToken);
app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({ error });
    }

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;

    // this would be a good place to store these in a database

    prettyPrintResponse(tokenResponse);
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    });
  });
});

// Retrieve an Item's accounts
// https://plaid.com/docs/#accounts
// TODO
// change endpoint name to indicate what type of accounts
// will be returned.
// account ids ought to be stored in the DB and associated
// with a User and an Item
app.get('/accounts', function(request, response, next) {
  plaidClient.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({ error });
    }
    // filter out accounts of interest: checking/debit or credit card
    var accountsOfInterest = accountsResponse.accounts.filter(account => account.subtype == "checking" || account.subtype == "credit card");
    prettyPrintResponse(accountsOfInterest);
    // this app is for tracking credit and/or debit card activity.
    // if there are 0 accounts of interest, handle that appropriately
    response.json({error: null, accounts: accountsOfInterest});
  });
});

// Retrieve information about an Item
// https://plaid.com/docs/#retrieve-item
app.get('/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  plaidClient.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error
      });
    }
    // Also pull information about the institution
    plaidClient.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        prettyPrintResponse(itemResponse);
        response.json({
          institution: instRes.institution,
        });
      }
    });
  });
});

// Server Startup
const server = app.listen(PORT, function() {
  console.log("Server running on port %s", PORT);
});

var prettyPrintResponse = response => {
  console.log(util.inspect(response, {colors: true, depth: 4}));
};