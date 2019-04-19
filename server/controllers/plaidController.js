var prettyPrintResponse = require("../../utils/prettyPrintResponse");
var plaidController = {};

// TODO: Action methods in PlaidController need access to Plaid Client

// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

plaidController.getAccessToken = function(request, response, next) {
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
}

module.exports = plaidController;
