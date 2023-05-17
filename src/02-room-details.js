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
  let dinoRooms = `Dinosaur with name '${dinosaurName}' cannot be found.`
    if (!dinosaurs.find(dino => dino.name === dinosaurName)) {
      return dinoRooms
    }
    let ourDino = dinosaurs.find(dino => dino.name === dinosaurName)
    let roomWithDino = rooms.find(room => room.dinosaurs.includes(ourDino.dinosaurId))
  if (!roomWithDino) {
    return "Dinosaur with name '" + dinosaurName + "' cannot be found in any rooms."
  }
  return roomWithDino.name
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
  let ourRoom = rooms.find(room => room.roomId.includes(id));
    //we are using the .find method to store the room we want as variable ourRoom. This will be an object(element of rooms array) if .find returns a truthy value
    if(!ourRoom) {
      //if no element  of our rooms array satisfies the callbackfunction of .roomId.includes(id-parameter) we will return the following error code.
      //.find() iterated through our array looking through each element to see if any of their dot roomId properties included our parameter id
      return "Room with ID of '" + id + "' could not be found.";
    };
    //if .find returned a flasy value i.e undefined we are saying to return above error code
    let connectedRooms = ourRoom.connectsTo.map(roomIdCheck => { 
       //.map is returning an array whose elements each satisfy the callback function below
      //declaring a variable to hold our array created by .map which will loop through ourRoom's dot connectsTo property and perform the following 
     
      for(let room of rooms) {
        //We are looping through our rooms array to see if any room has the dot roomId property that matches any of elements of ourRoom.connectsTo array, we are declaring each element of that array
        //as room Id check. connectedRooms variable will be an array where each element has a roomId property equal to an element inside of OurRoom.connectsTo array
        if(room.roomId == roomIdCheck) {
        //conditional if room.roomId is strictly equal to our roomIdCheck
          return room.name;
        };
      };
      //otherwise connectedRooms will store the value of 'Error'
          return `ERROR`;
    });
    
    if (connectedRooms.includes('ERROR')) {
      //if connectedRooms stored a value of 'Error' return the following error code 
      return `Room with ID of 'incorrect-id' could not be found.`;
    };
    // console.log(connectedRooms)
    //returning our connectedRooms which is an array of room names 
    return connectedRooms;
  }


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
