//convert snake case object keys to camel case
//work around object or an array
export default function convertToCamelCase(data: object | []) {
  const formattedObject: object = {};
  const formattedData: object[] = [];
  let formattedKey = '';
  if (typeof data === 'object' && !Array.isArray(data)) {
    // work around an object
    for (const key in data) {
      //removes .
      formattedKey =
        key.indexOf('.') > -1
          ? key.slice(key.indexOf('.') + 1, key.length)
          : key;
      //change case
      formattedKey = formattedKey.replace(/_./g, (x) => x[1].toUpperCase());
      formattedObject[formattedKey] = data[key];
    }
    return formattedObject;
  } else {
    //work around array
    data.forEach((dataSet) => {
      for (const key in dataSet) {
        //removes .
        formattedKey =
          key.indexOf('.') > -1
            ? key.slice(key.indexOf('.') + 1, key.length)
            : key;
        //change case
        formattedKey = formattedKey.replace(/_./g, (x) => x[1].toUpperCase());
        formattedObject[formattedKey] = dataSet[key];
      }
      formattedData.push(formattedObject);
    });

    return formattedData;
  }
}
