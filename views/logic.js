async function addNewCard(public_token) {
  
  await generateAPIAccesToken(public_token);
  var cards = await getDebitAndCreditCardsForAccount();
  var cardsToTrack = promptUserForCardsToTrack(cards);
  processUserSelectionsAndUpdateDOM(cardsToTrack);
  /***
   * 1. generateAPIAccessToken
   * 2. getDebitAndCreditCardsData
   * 3. promptUserForCardsToTrack
   * 4. processUserSelectionsAndUpdateDOM
   */

}

/** You give a public token, you get an API access_token and an ItemID  */
/** I don't think we really need these in the front-end, but look more into it */
function generateAPIAccesToken(public_token) {
  return axios.get("/get_access_token", { public_token });
}

/** should return array of accounts */
function getDebitAndCreditCardsForAccount() {
  return await axios.get("/accounts");
}

function promptUserForCardsToTrack(cards) {}

function processUserSelectionsAndUpdateDOM(userSelectedCards) {}

// var accessTokenRequestResponse;
//   try {
//     accessTokenRequestResponse = await generateAPIAccessToken(public_token);
//   } catch (error) {
//     // error in token exchange workflow
//     console.log(error);
//     // do better error handling
//   }

//   if (accessTokenRequestResponse.status == 200) {
//     var accountsRequestResponse;
//     try {
      
//     } catch (error) {
      
//     }
//   }