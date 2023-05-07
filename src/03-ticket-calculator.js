/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

const {
  returnSpecified,
  returnObject,
} = require("../src/01-dinosaur-facts");

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
  let ticketType = ticketInfo['ticketType']
  let entrantType = ticketInfo['entrantType']


  //Ticket type error handling
  if(ticketData[ticketType] == undefined) {
    return `Ticket type '${ticketType}' cannot be found.`
  }
  let totalPrice = ticketData[ticketType]['priceInCents'][entrantType]

  //Entrant type error handling
  if(totalPrice == undefined){
    return `Entrant type '${entrantType}' cannot be found.`
  }
  

  //Checks each extra for validity, adds to total if valid, throws if bad.
  for (extra of ticketInfo.extras) {
    if (ticketData['extras'][extra] == undefined) {
      return `Extra type '${extra}' cannot be found.`
    } else {
      totalPrice += ticketData['extras'][extra]['priceInCents'][entrantType]
    }
}
  return totalPrice
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
  let totalPrice = 0;
  let comboText = []

  let finalText = `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n`

  for(ticket of purchases){
    
    /* Will return the price of the ticket if valid, 
    otherwise will store the error message as string*/
    let ticketPrice = calculateTicketPrice(ticketData, ticket);

    // Check for error message via string, returns if true
    if(typeof ticketPrice == 'string'){
      return ticketPrice
    }

    totalPrice += ticketPrice;
    
    // Initialize storage for strings to be combined.
    let comboText = [ticket['entrantType'],ticket['ticketType'],"admission:",`$${ticketPrice/100}.00`];
    let comboExtras = ''

    //Combine the strings in the first array, Capitalize properly.
    comboText = comboText.map(text => { 
     return text[0].toUpperCase()+ text.slice(1);
    })

    //Check for 
    if (ticket.extras.length > 0) {
      comboExtras = " (" + ticket.extras.map(text => {
      return text[0].toUpperCase()+ text.slice(1) + " Access"
    }).join(', ') + ")"
    }

    finalText += comboText.join(' ') + comboExtras +`\n`
    console.log(ticket.extras)
  }

  //Append Final statement
  finalText += `-------------------------------------------\nTOTAL: $${totalPrice/100}.00`

  return finalText
}


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
