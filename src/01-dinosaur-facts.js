/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
if (!dinosaurs.length) { // check if the dinosaurs array is empty
  return {}; //if it's empty, return an empty object
}

// declare the variable tallestDinosaur to the value of the first dinosaur in the array using [0]
let tallestDinosaur = dinosaurs[0];

// loop through the rest of the dinosaurs in the array NOTE: i started i = 1 because the variable tallesDinosaur has the value of the index 0;
for (let i = 1; i < dinosaurs.length; i++) {
  // if the length of the current dinosaur is greater than the length of the tallest dinosaur we've seen so far
  if (dinosaurs[i].lengthInMeters > tallestDinosaur.lengthInMeters) {
    // update the tallestDinosaur variable to the new value of the current dinosaur
    tallestDinosaur = dinosaurs[i];
  }
}

// declare a variable in this case lengthInFeet to the value of the multiply tallestDinosaur.lengthInMeters  * 3.281;
let lengthInFeet = tallestDinosaur.lengthInMeters * 3.281;

// return an object with the name of the tallest dinosaur and its length in feet
return { [tallestDinosaur.name]: lengthInFeet };
}









/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // i used the find() method to search for the dinosaur object that has the same dinosaurId property as the given id parameter. If there's a match, dinosaur will hold the object, otherwise it will be undefined
  const dinosaur = dinosaurs.find((dino) => dino.dinosaurId === id);

  // If no dinosaur was found, return an error message
  if (!dinosaur) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }

  // Format the dinosaur's name, pronunciation, and description
  const name = dinosaur.name;
  const pronunciation = dinosaur.pronunciation;
  const description = dinosaur.info;
  const period = dinosaur.period;

  // Construct the final description string with proper formatting '\n' - A newline character, which creates a line break in the final string.
  const formattedDescription = `${name} (${pronunciation})\n${description} It lived in the ${period} period, over ${dinosaur.mya[dinosaur.mya.length - 1]} million years ago.`;

  return formattedDescription;
}












/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // Filter out the dinosaurs that were not alive during the specified time period
  const validDinosaurs = dinosaurs.filter((dino) => {
    // I Checked if the dinosaur's mya value is within the specified time period
    const myaArray = dino.mya;
    if (myaArray.length === 1) {
      // If the dinosaur has only one mya value, allow for 1 MYA less than the amount
      return myaArray[0] === mya || myaArray[0] - 1 === mya;
    } else {
      return mya >= myaArray[myaArray.length - 1] && mya <= myaArray[0];
    }
  });

  // If a key is specified and there are valid dinosaurs, return an array of the values of the specified key
  if (key && validDinosaurs.length > 0) {
    return validDinosaurs.map((dino) => dino[key] || dino.dinosaurId);
  } else {
    // Otherwise, return an array of the IDs of the valid dinosaurs
    return validDinosaurs.map((dino) => dino.dinosaurId);
  }


}

  



module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
