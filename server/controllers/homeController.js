var plaidConfig = require("../../config/config.json").plaid;

var homeController = {};

homeController.index = function(req, res) {
  res.render("index.ejs", {
    PLAID_PUBLIC_KEY: plaidConfig.publicKey,
    PLAID_ENV: plaidConfig.envs.sandbox,
    PLAID_PRODUCTS: plaidConfig.products.transactions,
  });
}

module.exports = homeController;
