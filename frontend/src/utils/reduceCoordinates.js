const reduceCoordinates = (allCoordinates) => {
  let short = [];

  if (allCoordinates.length <= 25) {
    short.push(...allCoordinates);
  } else if (allCoordinates.length > 25 && allCoordinates.length < 50) {
    const interval = Math.round(allCoordinates.length / (allCoordinates.length - 22));

    let arrayToRemove = [];
    for (let k = 1; k < allCoordinates.length - 22; k++) {
      arrayToRemove.push(allCoordinates[k * interval]);
    }
    const difference = allCoordinates.filter((coord) => !arrayToRemove.includes(coord));
    short.push(...difference);
  } else {
    const section = Math.floor(allCoordinates.length / 23);
    for (let i = section; i <= section * 23; i += section) {
      short.push(allCoordinates[i]);
    }
  }

  return short;
};

export default reduceCoordinates;

/*
let difference = arr1.filter(x => !arr2.includes(x));
*/
