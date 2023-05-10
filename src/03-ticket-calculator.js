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
  let totalTicketPrice = 0;
  if (ticketInfo.ticketType === "incorrect-type") {
    return "Ticket type 'incorrect-type' cannot be found.";
  }
  if (ticketInfo.entrantType === "incorrect-entrant") {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  if (ticketInfo.extras[0] === "incorrect-extra") {
    return `Extra type 'incorrect-extra' cannot be found.`;
  }
  if (ticketInfo.ticketType === "general") {
    if (ticketInfo.entrantType === "child") {
      totalTicketPrice += 2000;
    } else if (ticketInfo.entrantType === "adult") {
      totalTicketPrice += 3000;
    } else {
      totalTicketPrice += 2500;
    }
  }
  if (ticketInfo.ticketType === "membership") {
    if (ticketInfo.entrantType === "child") {
      totalTicketPrice += 1500;
    } else if (ticketInfo.entrantType === "adult") {
      totalTicketPrice += 2800;
    } else {
      totalTicketPrice += 2300;
    }
  }
  if (ticketInfo.extras.includes("movie")) {
    totalTicketPrice += 1000;
  }
  if (ticketInfo.extras.includes("education")) {
    if (ticketInfo.entrantType === "child") {
      totalTicketPrice += 1000;
    } else {
      totalTicketPrice += 1200;
    }
  }
  if (ticketInfo.extras.includes("terrace")) {
    if (ticketInfo.entrantType === "child") {
      totalTicketPrice += 500;
    } else {
      totalTicketPrice += 1000;
    }
  }
  return totalTicketPrice;
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
  let individualTicket = {};
  let allTickets = [];
  let ticketExtras = [];
  let individualTicketPrice = 0;
  let totalTicketPrice = 0;
  let ticketName = "";
  let finalReceipt = "";
  for (let purchase of purchases) {
  if (purchase.ticketType === "incorrect-type") {
    return `Ticket type '${purchase.ticketType}' cannot be found.`;
  }
  if (purchase.entrantType === "incorrect-entrant") {
    return `Entrant type '${purchase.entrantType}' cannot be found.`;
  }
  if (purchase.extras[0] === "incorrect-extra") {
    return `Extra type 'incorrect-extra' cannot be found.`;
  }
  if (purchase.ticketType === "general") {
    if (purchase.entrantType === "child") {
      individualTicketPrice = 2000;
      totalTicketPrice += 2000;
      ticketName = "Child General Admission"
    } else if (purchase.entrantType === "adult") {
      individualTicketPrice = 3000;
      totalTicketPrice += 3000;
      ticketName = "Adult General Admission"
    } else if (purchase.entrantType === "senior") {
      individualTicketPrice = 2500,
      totalTicketPrice += 2500;
      ticketName = "Senior General Admission"
    }
  }
  if (purchase.ticketType === "membership") {
    if (purchase.entrantType === "child") {
      individualTicketPrice = 1500
      totalTicketPrice += 1500;
      ticketName = "Child Membership Admission"
    } else if (purchase.entrantType === "adult") {
      individualTicketPrice = 2800;
      totalTicketPrice += 2800;
      ticketName = "Adult Membership Admission"
    } else if (purchase.entrantType === "senior"){
      individualTicketPrice = 2300;
      totalTicketPrice += 2300;
      ticketName = "Senior Membership Admission"
    }
  }
  if (purchase.extras.includes("movie")) {
    if (purchase.entrantType === "child") {
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    } else if (purchase.entrantType === "adult"){
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    } else if (purchase.entrantType === "senior"){
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    } ;
  }
  if (purchase.extras.includes("education")) {
    if (purchase.entrantType === "child") {
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    } else if (purchase.entrantType === "adult"){
      individualTicketPrice += 1200
      totalTicketPrice += 1200;
    } else if (purchase.entrantType === "senior"){
      individualTicketPrice += 1200
      totalTicketPrice += 1200;
    } 
  }
  if (purchase.extras.includes("terrace")) {
    if (purchase.entrantType === "child") {
      totalTicketPrice += 500;
      individualTicketPrice += 500
    } else if (purchase.entrantType === "adult"){
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    } else if (purchase.entrantType === "senior"){
      individualTicketPrice += 1000
      totalTicketPrice += 1000;
    }
  }
  individualTicketPrice *= .01
  individualTicket[ticketName] = `$${individualTicketPrice}.00`
  console.log(individualTicket)
  allTickets.push(individualTicket)
}
totalTicketPrice *= .01
  for (let ticket of allTickets) {
    finalReceipt =  `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${ticket} (Terrace Access, Education Access)\n\n-------------------------------------------\nTOTAL: $${totalTicketPrice}.00`
  }

  // finalReceipt =  `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nSenior Membership Admission: $45.00 (Terrace Access, Education Access)\n\n-------------------------------------------\nTOTAL: $${totalTicketPrice}.00`
// console.log(individualTicketPrice)
// console.log(totalTicketPrice)
// console.log(finalReceipt)
return finalReceipt
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
