const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlers engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Panagiotis",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Panagiotis",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is an error",
    title: "Help",
    name: "Panagiotis",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No search term provided",
    });
  }

  geoCode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error: "geoCode error",
      });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error: "forecast error",
        });
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found",
    title: "404 Error",
    name: "Panagiotis",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found",
    title: "404 Error",
    name: "Panagiotis",
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
