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
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let nameOfRoom = "";
  let dinoFound = false;
  let dinosaurNameAsId = "";

  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurName === dinosaurs[i].name) {
      dinosaurNameAsId = dinosaurs[i].dinosaurId;
      dinoFound = true;
      break;
    }
  }

  if (!dinoFound) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for (let room of rooms) {
    for (let dinosaur of room.dinosaurs) {
      if (dinosaurNameAsId === dinosaur) {
        nameOfRoom = room.name;
        break;
      }
    }
    if (nameOfRoom !== "") {
      break;
    }
  }

  if (nameOfRoom === "") {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }

  return nameOfRoom;
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

  const currentRoom = rooms.find(room => room.roomId === id);

  if (currentRoom = undefined) {
    return `Room with ID of '${id}' could not be found.`;
  }

  const listOfConnectedRooms = currentRoom.connectsTo;
  const connectedRoomNames = rooms.filter(room => listOfConnectedRooms.includes(room.roomId)).map(room => room.name);


  for (let i = 0; i < rooms.length; i++) {
    if (id === rooms[i].roomId) {
    for (let j = 0; j < rooms[i].connectsTo.length; j++) {
      listOfConnectedRooms.push(rooms[i].connectsTo[j]);
    }
   }
  }

  for (let i = 0; i < listOfConnectedRooms.length; i++) {
    for (let j = 0; j < rooms.length; j++) {
      if (listOfConnectedRooms[i] === rooms[j].roomId) {
        connectedRooms.push(rooms[j].name)
      }
    }
  }

  return connectedRooms;

}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
