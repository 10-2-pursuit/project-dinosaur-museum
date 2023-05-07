/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

const {
  returnSpecified,
  returnObject,
} = require("../src/01-dinosaur-facts");



/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */

const input = [
  {
    roomId: "xwG7O4wQl",
    name: "Room A",
    requiredTicketPermissions: [],
    dinosaurs: [],
    connectsTo: [
      "GHPLI7EmD", // Room B
      "eU46gvYUF", // Room C
    ],
  },
];

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  const arrayPropDino = returnSpecified(dinosaurs, 'name');
  const arrayPropRoom = returnSpecified(rooms,'dinosaurs');

  const foundDino = returnObject(dinosaurs,arrayPropDino,dinosaurName);
  let foundRoom = {};

  //Check if name provided exists within list thats been compiled
  if (arrayPropDino.includes(dinosaurName)) {
    arrayPropRoom.forEach(room => {
      if(room.includes(foundDino.dinosaurId)) {
        foundRoom = rooms[arrayPropRoom.indexOf(room)];
      }
    })
  } else {
    // Cant find name, return statement
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  // The name exists but is not found in any of the rooms provided.
  return foundRoom.name ? foundRoom.name : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  let arrayPropRoomId = returnSpecified(rooms, 'roomId');

   //Finds the index of the id we're looking for 
   let index = arrayPropRoomId.indexOf(id);
  
   //Perform check for valid id. Return error if not found.
   if (index == -1) {
     return `Room with ID of '${id}' could not be found.`;
   }

  let arrayPropConnectsTo = returnSpecified(rooms, 'connectsTo');
  let arrayPropNames = returnSpecified(rooms,'name');
  let connectedRooms = [];

  //Goes through the connected rooms stored at that index and pushes them to a new array
  for (roomId of arrayPropConnectsTo[index]) {
    //Check if rooms provided in connected rooms exist. Throw if bad.
    if (arrayPropRoomId.indexOf(roomId) != -1) {
      connectedRooms.push(arrayPropNames[arrayPropRoomId.indexOf(roomId)]);
    }
    else {
      return `Room with ID of '${roomId}' could not be found.`;
    }
  
  }
  return connectedRooms;
}

getConnectedRoomNamesById(exampleRoomData,`A6QaYdyKra`);

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
