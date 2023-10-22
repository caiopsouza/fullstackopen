const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { crudPersons } = require("./services");

morgan.token("body", (req) =>
    Object.keys(req.body).length ?
        JSON.stringify(req.body) :
        "");

const app = express();
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(bodyParser.json());

crudPersons(app);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
