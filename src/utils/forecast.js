const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9bceba57693d25a57f72e68f47fcb9bf&query=${long},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback("Unable to connect to weatherstack", undefined);
    } else if (body.error) {
      return callback("unable to find location", undefined);
    } else {
      return callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and it feels like ${body.current.feelslike}.`
      );
    }
  });
};

module.exports = forecast;
