function createPojectionObject(queryObject) {
  delete queryObject.limit;

  for (const prop in queryObject) {
    const propValue = Number(queryObject[prop]);
    if (Number.isNaN(propValue)) throw new Error('Projection value must be an integer');
    queryObject[prop] = propValue;
  }

  return queryObject;
}

const sendJsonResponse = (res, data) => {
  if ((!Array.isArray(data) && data) || (data && data.length > 0)) return res.status(200).json(data);
  res.status(404).json({ message: 'no data was found' });
};

const errorHandler = (res, error) => {
  res.status(404);
  res.json({ message: error.message });
};

module.exports = { createPojectionObject, sendJsonResponse, errorHandler };
