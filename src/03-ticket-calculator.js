/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
  function calculateTicketPrice(ticketData, ticketInfo) {
    let {ticketType, entrantType, extras} = ticketInfo;
    //declaring an object for ticketInfo
    let addedCost = 0;
    //declaring a variable with initial value 0 to be accumulated later 
    //Object.hasown checks if an object has particular property
    //we then set up conditionals using Object.hasOwn to see if our ticketData does or does not have a property called ticketType
  
    if(!Object.hasOwn(ticketData, ticketType)) {
      //if our ticketData does not have its own ticketType property
      //return the following error code
      return `Ticket type '${ticketType}' cannot be found.`;
  
    };
    if(!Object.hasOwn(ticketData[ticketType].priceInCents, entrantType)) {
      //using .hasown on object above to see if the above has an entrantType property
      //if it does not return the following error code
  
      return `Entrant type '${entrantType}' cannot be found.`;
  
    };
    for(let element of extras) {
      if(!Object.hasOwn(ticketData.extras, element)) {
        //we are looping through our array of extras for each element
        //if no element can be found 
        return `Extra type '${element}' cannot be found.`;
  
      };
    };
  
    for (let element of extras) {
  
      addedCost += ticketData.extras[element].priceInCents[entrantType];
      //added cost variable which was 0 will accumulate to the priceInCents of the ticket given its features and the cost in cents which depends on the entrant type
      //this line takes care of the cost of any additional extra elements added to the ticket 
  
    };
    console.log(ticketData[ticketType].priceInCents[entrantType] + addedCost)
  
    return ticketData[ticketType].priceInCents[entrantType] + addedCost;
  }
  function purchaseTickets(ticketData, purchases) {
    let welcome = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
    //welcome is our first line, we will add more on to it later
    let totalCost = 0;
    //declaring variable total cost to be accumulated later
    
    function printOurPurchaseInfo(price, purchase) {
      //making a helper function to add to our welcome to return all of the information we need in our welcome log
      const {ticketType, entrantType, extras} = purchase;
      let extraType = ` (`;
      //extratype is variable to accumulate with strings later seperated by
      //declaring variable for string concatination while storing information
      let priceBasedOnEntrantType = `${entrantType.replace(entrantType[0],entrantType[0].toUpperCase())} ${ticketType.replace(ticketType[0],ticketType[0].toUpperCase())} Admission: \$${(price/100).toFixed(2)}`;
      if(extras.length == 0){
        
        return priceBasedOnEntrantType + `\n`;
      }
      else{
        for(let i = 0; i < extras.length; i++) {
          if(i == extras.length -1) {
  
            extraType = extraType + '' + extras[i].replace(extras[i][0], extras[i][0].toUpperCase()) + ' Access)\n';
            break;   //stop at the last element  this is to uppercase the first letter of extras and add a spaces, the string access and our text break all formatted correctly 
          };
            //
          extraType = extraType + '' + extras[i].replace(extras[i][0], extras[i][0].toUpperCase()) + ' Access, ';
          //for each element of extras (i) we want to replace their first index from lower case to uppercase 
        };
        // console.log(priceBasedOnEntrantType + '' + extraType)
        return priceBasedOnEntrantType + '' + extraType;
      };
    };
    
    for(let purchase of purchases) {
      //using for of loop to access each object inside our array of purchases
      let price = calculateTicketPrice(ticketData, purchase);
      //declaring a variable price which is equal to our calculateTicketPrice(ticketData, purchase) 
      //this takes the ticket data and return the cost as a string of the price given the information in our purchase object(like ethe last problem)
      
      if(typeof(price) == "string") {
        //if our variable price is a string value we will return it 
        return price;
  
      };
  
      welcome = welcome + printOurPurchaseInfo(price, purchase);
      // we will accumulate our welcome variable with the original welcome and now the output of our printOurPurchaseInfo function
      //this will be done for each purchase of the purchases array
      
      totalCost += price;
      //we will then set totalCost our accumulator value equal to the price obtained in our loop
    };
    // we accumulate welcome one more time to have the information it already stores 
    console.log(welcome)
    welcome = welcome + `-------------------------------------------\n` + `TOTAL: \$${(totalCost/100).toFixed(2)}`;
    console.log(welcome)
    return welcome;
    
  }

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
