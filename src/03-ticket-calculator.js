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
  /** declare vars */
  const {ticketType, entrantType, extras} = ticketInfo;
  let extraTotal = 0;

  /** validation for prop. */
  if(!Object.hasOwn(ticketData, ticketType)){
    return errorPrinter("Ticket", ticketType);
  }
  if(!Object.hasOwn(ticketData[ticketType].priceInCents, entrantType)){
    return errorPrinter("Entrant", entrantType);
  }
  for(let extra of extras){
    if(!Object.hasOwn(ticketData.extras, extra)){
      return errorPrinter("Extra", extra);
    }
    extraTotal += ticketData.extras[extra].priceInCents[entrantType];
  }

  return ticketData[ticketType].priceInCents[entrantType] + extraTotal;
}

/**
 * errorPrinter()
 * --------------------
 * Purpose to print a single line of error message in the function calculateTicketPrice().
 * 
 * @param {string} type - A 'key' from the tickets object.
 * @param {string} input - A inputted type from @param [ticketInfo]
 * @returns {string} The single line of error message.
 */
function errorPrinter(type, input){
  return `${type} type '${input}' cannot be found.`;
}

/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  /** declare vars w/ initial values */
  let resultString = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`;
  let totalP = 0;

  /** validation, string means error */
  for(let purchase of purchases){
    let price = calculateTicketPrice(ticketData, purchase);
    if(typeof(price) == "string"){
      return price;
    }

    /** concat each ticket details to [resultString] */
    resultString = resultString.concat('',purchasePrinter(price, purchase));
    totalP += price;
  }

  /** concat total ticket price */
  resultString = resultString.concat('',`-------------------------------------------\n`);
  resultString = resultString.concat('',`TOTAL: \$${(totalP/100).toFixed(2)}`);

  return resultString;
}

/**
 * purchasePrinter()
 * ----------------------------------------
 * Return a string about the details of the ticket purchases
 * 
 * @param {Number} price - receiving the ticket price to print
 * @param {Object} purchase - receiving a single ticket from the purchases
 * @returns {string} - return a string of the calculation
 */
function purchasePrinter(price, purchase){
  /** declare vars */
  const {ticketType, entrantType, extras} = purchase;
  let extraString = ` (`;
  let resultBasic = `${entrantType.replace(entrantType[0],entrantType[0].toUpperCase())} ${ticketType.replace(ticketType[0],ticketType[0].toUpperCase())} Admission: \$${(price/100).toFixed(2)}`;
  
  /** validation for an extra */
  if(extras.length == 0){
    return resultBasic + `\n`;
  }
  else{
    for(let index = 0; index < extras.length; index++){
      if(index == extras.length -1){
        extraString = extraString.concat('',extras[index].replace(extras[index][0], extras[index][0].toUpperCase()) + ' Access)\n');
        break;        
      }
      extraString = extraString.concat('',extras[index].replace(extras[index][0], extras[index][0].toUpperCase()) + ' Access, ');
    }
    
    return resultBasic.concat('',extraString);
  }
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
