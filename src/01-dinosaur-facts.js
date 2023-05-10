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
// function getLongestDinosaur(dinosaurs) {}
function getLongestDinosaur(dinosaurs) { let longestDinosaur = null;
  let longestLength = 0;
  
  dinosaurs.forEach((dinosaur) => {
    if (dinosaur.lengthInMeters > longestLength) {
      longestDinosaur = dinosaur.name;
      longestLength = dinosaur.lengthInMeters;
    }
  });
  
  const longestDinosaurInFeet = longestLength * 3.281;
  return { [longestDinosaur]: longestDinosaurInFeet };}
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
// function getDinosaurDescription(id, description) {
//   const dinosaur = dinosaurs.find(dino => dino.dinosaurId === id);
//   if (!dinosaur) {
//     return 'Dinosaur with ID ${id} not found.';
//   }
//   const { name, pronunciation, meaningOfName, diet, lengthInMeters, period, 
//   mya, info } = dinosaur;
//   return '${name} (${pronunciation} was a ${diet} dinosaur that lived during the    ${period} period, around ${mya[0]}-${mya[1]} million years agi. Its name means '${meaningOfName}'. It was about ${lengthInMeters meters long. $[description} ${info}';
// } 

// function getDinosaurDescription(dinosaurs, id) {
//   const dinosaur = dinosaurs.find(d => d.dinosaurId === id);
//   if (!dinosaur) {
//     return `A Dinosaur with an ID of ${id} cannot be found`;
//   }
//   const {
//     name,
//     pronunciation,
//     meaningOfName,
//     diet,
//     lengthInMeters,
//     period,
//     mya,
//     info,
//   } = dinosaur;
//   const myaStr = `${mya[0]}-${mya[1]} million years ago`;
//   return `${name} (${pronunciation}) \nlived during the ${period} period, about ${myaStr}. It was a ${diet} dinosaur that was ${lengthInMeters} meters long. Its name, ${meaningOfName}, describes its characteristics.      ${info}`;
 
// }
function getDinosaurDescription(dinosaurs, id) {
  const dinosaur = dinosaurs.find((dino) => dino.dinosaurId === id);

  if (!dinosaur) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }

  const pronunciation = dinosaur.pronunciation ? ` (${dinosaur.pronunciation})` : "";
  const mya = dinosaur.mya.length === 2 ? `${dinosaur.mya[0]} to ${dinosaur.mya[1]}` : `${dinosaur.mya[0]}`;

  return `${dinosaur.name}${pronunciation}\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.`;
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
// function getDinosaursAliveMya(dinosaurs, mya, key = 'dinosaurId') {
//   return dinosaurs.filter(dino => mya >= dino.mya[1] && mya <= dino.mya[0])
//   .map(dino => key === 'dinosaurId' ? dino.dinosaurId : dino.mya);
// }
// function getDinosaursAliveMya(dinosaurs, mya, key = "dinosaurId") {
//   const result = [];

//   dinosaurs.forEach((dinosaur) => {
//     const { mya: years, [key]: value } = dinosaur;

//     if (Array.isArray(years)) {
//       const [min, max] = years;
//       if (mya >= min && mya <= max) {
//         result.push(value);
//       }
//     } else {
//       if (mya === years - 1) {
//         result.push(value);
//       }
//     }
//   });

//   return result;
// }
// function getDinosaursAliveMya(dinosaurs, mya, key) {
//   const result = [];

//   dinosaurs.forEach((dinosaur) => {
//     const dinosaurMya = dinosaur.mya;

//     if (Array.isArray(dinosaurMya)) {
//       if (dinosaurMya[0] <= mya && dinosaurMya[0] >= mya - 1) {
//         result.push(dinosaur[key] || dinosaur.id);
//       }
//     } else {
//       if (dinosaurMya <= mya && dinosaurMya >= mya - 1) {
//         result.push(dinosaur[key] || dinosaur.id);
//       }
//     }
//   });

//   return result;
// }
// function getDinosaursAliveMya(dinosaurs, mya, key = "dinosaurId") {
//   const result = [];
//   for (const dinosaur of dinosaurs) {
//     const myaArray = dinosaur.mya;
//     if (myaArray.length === 1) {
//       if (mya <= myaArray[0] + 1) {
//         result.push(dinosaur[key]);
//       }
//     } else {
//       if (mya <= myaArray[0] && mya >= myaArray[1]) {
//         result.push(dinosaur[key]);
//       }
//     }
//   }
//   return result;
// }
function getDinosaursAliveMya(dinosaurs, mya, key = "dinosaurId") {
  const ids = dinosaurs
    .filter(dino => {
      if (dino.mya.length === 1) {
        return mya >= dino.mya[0] - 1 && mya <= dino.mya[0];
      } else {
        return mya >= dino.mya[1] && mya <= dino.mya[0];
      }
    })
    .map(dino => dino[key]);

  return ids;
}


//Whats the average lifespan of a dinosaur?
function avgDinosaurLifeSpan() {
  let totalLifeSpan = 0;
  let totalDinosaurs = 0;

  for (const dinosaur in dinosaurs) {
    totalLifeSpan += dinosaurs[dinosaur].lifeSpan;
    totalDinosaurs++;
  }

  const averageLifeSpan = totalLifeSpan / totalDinosaurs;
  return averageLifeSpan;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
