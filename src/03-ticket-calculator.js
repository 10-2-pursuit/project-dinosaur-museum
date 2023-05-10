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
// function calculateTicketPrice(ticketData, ticketInfo) {}
function calculateTicketPrice(ticketData, ticketInfo) {
  const { ticketType, entrantType, extras } = ticketInfo;

  if (!ticketData.hasOwnProperty(ticketType)) {
    return `Invalid ticket type: ${ticketType}`;
  }

  if (!ticketData[ticketType].priceInCents.hasOwnProperty(entrantType)) {
    return `Invalid entrant type: ${entrantType}`;
  }

  const validExtras = Object.keys(ticketData.extras);
  const invalidExtras = extras.filter((extra) => !validExtras.includes(extra));

  if (invalidExtras.length > 0) {
    return `Invalid extras: ${invalidExtras.join(", ")}`;
  }

  let totalCost = ticketData[ticketType].priceInCents[entrantType];

  for (const extra of extras) {
    totalCost += ticketData.extras[extra].priceInCents[entrantType];
  }

  return totalCost;
}
// function calculateTicketPrice(tickets, ticketInfo) {
//   const { ticketType, entrantType, extras } = ticketInfo;
//   const ticketPrice = tickets[ticketType].priceInCents[entrantType];
//   let extrasTotal = 0;

//   extras.forEach((extra) => {
//     const extraPrice = tickets.extras[extra].priceInCents[entrantType];
//     extrasTotal += extraPrice;
//   });

//   return ticketPrice + extrasTotal;
// }



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
// function purchaseTickets(ticketData, purchases) {}
// function purchaseTickets(ticketData, purchases) {
//   const receipt = [];
//   let totalCost = 0;

//   for (const purchase of purchases) {
//     const { ticketType, entrantType, extras } = purchase;

//     if (!ticketData.hasOwnProperty(ticketType)) {
//       return `Ticket type '${ticketType}' cannot be found.`;
//     }

//     if (!ticketData[ticketType].priceInCents.hasOwnProperty(entrantType)) {
//       return `Invalid entrant type: ${entrantType}`;
//     }

//     const validExtras = Object.keys(ticketData.extras);
//     const invalidExtras = extras.filter((extra) => !validExtras.includes(extra));

//     if (invalidExtras.length > 0) {
//       return `Invalid extras: ${invalidExtras.join(", ")}`;
//     }

//     const ticketDescription = ticketData[ticketType].description;
//     const ticketPrice = ticketData[ticketType].priceInCents[entrantType];
//     const extraDescriptions = extras.map((extra) => ticketData.extras[extra].description);
//     const extraPrices = extras.map((extra) => ticketData.extras[extra].priceInCents[entrantType]);
//     const ticketTotalPrice = ticketPrice + extraPrices.reduce((acc, curr) => acc + curr, 0);

//     receipt.push(`${entrantType} ${ticketDescription}: $${(ticketTotalPrice / 100).toFixed(2)} (${extraDescriptions.join(", ")})`);
//     totalCost += ticketTotalPrice;
//   }

//   return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt.join("\n")}\n-------------------------------------------\nTOTAL: $${(totalCost / 100).toFixed(2)}`;
// }
function purchaseTickets(ticketData, purchases) {
  const ticketReceipt = [];
  let totalCost = 0;

  for (const purchase of purchases) {
    const { ticketType, entrantType, extras } = purchase;

    // check if the ticket  type exists
    if (!ticketData[ticketType]) {
      return `Ticket type '${ticketType}' cannot be found.`;
    }

    // check if the entrant type exists
    if (!ticketData[ticketType].priceInCents[entrantType]) {
      return `Entrant type '${entrantType}' cannot be found.`;
    }

    // calculate the base ticket price
    const basePrice = ticketData[ticketType].priceInCents[entrantType] / 100;

    // Calculate the price for each extra
    const extraPrices = extras.map(extra => {
      if (!ticketData.extras[extra]) {
        return `Extra '${extra}' cannot be found.`;
      }
      return ticketData.extras[extra].priceInCents[entrantType] / 100;
    });

    // Calculate the total price for the ticket
    const ticketPrice = basePrice + extraPrices.reduce((sum, price) => sum + price, 0);

    // Add the ticket to the receipt
    ticketReceipt.push(`${entrantType} ${ticketData[ticketType].description}: $${ticketPrice.toFixed(2)} (${extras.join(", ")})`);

    // Add the ticket price to the total cost
    totalCost += ticketPrice;
  }

  // Generate the full receipt
  const receipt = [
    "Thank you for visiting the Dinosaur Museum!",
    "-------------------------------------------",
    ...ticketReceipt,
    "-------------------------------------------",
    `TOTAL: $${totalCost.toFixed(2)}`,
  ];

  return receipt.join("\n");
}








// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
