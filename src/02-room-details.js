/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

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
const getRoomByDinosaurName = (dinosaurs, rooms, dinosaurName) => {
  // empty string to return
  let dinosaurRoom = "";
// error message for empty list
let noDinosaurFound = `Dinosaur with name '${dinosaurName}' cannot be found.`;
// loop thru dino array 
  for (const dinosaur of dinosaurs) {
  // check if current name matches dinoName param
    if (dinosaur.name === dinosaurName) {
// code block{make empty string the value of found name dinoId}
      dinosaurRoom = dinosaur.dinosaurId;
    }
  }
  // if empty string val is still empty
  if (dinosaurRoom === "") {
    // execute code block{error message}
    return noDinosaurFound;
  }
  // loop thru rooms 
  for (const room of rooms) {
    // loop thru dino in rooms
    for (const dino of room.dinosaurs) {
      // if there is a dino room and dino match
      if (dinosaurRoom === dino) {
        // execute code block return rm name
        return room.name;
      }
    }
  }
  // if above conditions are not met return default error mess
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
const getConnectedRoomNamesById = (rooms, id) => {
  const connectedRoom = rooms.find(room => room.roomId === id);
    let connectedRoomNames = [];
  
    if (!connectsToRoomId) {
      return `Room with ID of '${id}' could not be found.`;
    } else {
      for (let roomTag of connectsToRoomId) {
        for (let room of rooms) {
          if (roomTag === room.roomId) {
            connectedRoomNames.push(room.name);
          }
        }
      }
  
      if (connectsToRoomId.length !== connectedRoomNames.length) {
        errorMessage = `Room with ID of 'incorrect-id' could not be found.`;
      }
    }
    return connectedRoomNames;
  }
  


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
