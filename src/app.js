const express = require("express");
const app = express();
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

app.use(express.json());

//Routers
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

//Error Handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
