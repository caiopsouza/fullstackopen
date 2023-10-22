const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

let persons = [
    {
        name: "Arto Hellas",
        number: "045-31235234",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Juha Tauriainen",
        number: "36-66-7889553",
        id: 5
    }
];

morgan.token("body", (req) =>
    Object.keys(req.body).length ?
        JSON.stringify(req.body) :
        "");

const app = express();
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get("/persons", (req, res) => {
    res.json(persons);
});

app.post("/persons", (req, res) => {
    const person = {
        name: req.body.name,
        number: req.body.number,
        id: persons.length + 1
    };
    persons.push(person);
    res.json(person);
});

function findPersonById(id) {
    const personId = parseInt(id, 10);
    const person = persons.find((p) => p.id === personId);
    const personIndex = persons.indexOf(person);
    return [personId, personIndex];
}

app.put("/persons/:id", (req, res) => {
    const [idToUpdate, indexToUpdate] = findPersonById(req.params.id);

    const personUpdated = JSON.parse(JSON.stringify(req.body));
    personUpdated.id = idToUpdate;

    persons[indexToUpdate] = personUpdated;

    res.json(personUpdated);
});

app.delete("/persons/:id", (req, res) => {
    const [_, indexToDelete] = findPersonById(req.params.id);
    persons.splice(indexToDelete, 1);
    res.json({});
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
