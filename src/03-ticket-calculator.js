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
const calculateTicketPrice = (ticketData, ticketInfo) => {
  //checks if ticketdata has prop with key tickinfo.ticktyp 
  if (!ticketData.hasOwnProperty(ticketInfo.ticketType)) {
    //returns error if not found
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
// or checks if key of tickinfo.entrtype
  } else if (!ticketData.general.priceInCents.hasOwnProperty(ticketInfo.entrantType)) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  // loops over the tickinfo.extras
  for (const extra of ticketInfo.extras) {
    // checks tickdata for matching keys returns error if not found
    if (!Object.keys(ticketData.extras).includes(extra)) {
      return `Extra type '${extra}' cannot be found.`;
    }
  }
  //create variable for base price ticket
  let regularTicket = ticketData[ticketInfo.ticketType]["priceInCents"][ticketInfo.entrantType];
  // checks if array is empty (extras not available) skip for loop
  if (ticketInfo.extras.length !== 0) {
    // loops thru extras if found and adds price to regular ticket price
    for(const extra of ticketInfo.extras) {
      regularTicket += ticketData.extras[extra]["priceInCents"][ticketInfo.entrantType];
    }
  }
  return regularTicket;
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
const purchaseTickets = (ticketData, purchases) => {
  // default price variable set to 0
  let totalPrice = 0;
  // default receipt message
  let receipt = `Thank you for visiting the Dinosaur Museuem!\n-----------------------------------------\n;`
  // loop thru purchase array
  for (let i = 0; i < purchaseTickets.length; i++) {
    // set purchase var to current element/item
    const purchase = purchase[i];
  }
  // access ticktype set var to tickprice
  const ticketPrice = tickedtData[purchase.ticketType].price;
  // access extras create extras var
  const extras = purchse.extras;
  // loop thru extras and access extrasprice create variable add to tickprice
  for (const extra of purchase.extras) {
    const extraPrice = ticketData.extras[extra].price;
    // add up extras to tickprice
    ticketPrice += extraPrice;
  }
  // create extrasAddOnreceipt var empty string
  const extrasReceipt = "";

  // loop thru extrasdata assign description to extras addon
  for (const extra of extras) {
    extrasReceipt += ticketData.extras[extras].description;
    // check if extras have more than 1 
    if (extra !== extras[extras.length - 1]) {
      extrasReceipt += ", ";
    }
    // access case sensitive ticktype prop and create a var with 
    const purchaseType = purchase.entrantType[0].ToUpperCase
    // receipt purchase description string var
  }  
  // check if there are any extras format receipt and add
  //or add a new line
  // return receipt
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
