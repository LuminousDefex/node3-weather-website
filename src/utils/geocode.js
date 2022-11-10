const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGFuZGVmZXgiLCJhIjoiY2xhOWg0c3pzMDA0azN3bWU2a3BzNXdwdiJ9.pH_YaCj50ZwqkAXbs2CIYQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length < 1) {
      callback("unable to find location.Try an other search", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
