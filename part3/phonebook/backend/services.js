const persons = [
    { id: 1, name: "Arto Hellas", number: "045-31235234" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
    { id: 5, name: "Juha Tauriainen", number: "36-66-7889553" }
];

function crudPersons(app) {
    const PERSON_BASE_URL = "/api/persons";
    const PERSON_BASE_URL_ID = `${PERSON_BASE_URL}/:id`;

    function findPersonById(id) {
        const personId = parseInt(id, 10);
        const person = persons.find((p) => p.id === personId);
        const personIndex = persons.indexOf(person);
        return [personId, personIndex];
    }

    app.get(PERSON_BASE_URL, (req, res) => {
        res.json(persons);
    });

    app.post(PERSON_BASE_URL, (req, res) => {
        const person = {
            name: req.body.name, number: req.body.number, id: persons.length + 1
        };
        persons.push(person);
        res.json(person);
    });

    app.put(PERSON_BASE_URL_ID, (req, res) => {
        const [idToUpdate, indexToUpdate] = findPersonById(req.params.id);

        const personUpdated = JSON.parse(JSON.stringify(req.body));
        personUpdated.id = idToUpdate;

        persons[indexToUpdate] = personUpdated;

        res.json(personUpdated);
    });

    app.delete(PERSON_BASE_URL_ID, (req, res) => {
        const [_, indexToDelete] = findPersonById(req.params.id);
        persons.splice(indexToDelete, 1);
        res.json({});
    });
}

module.exports = { crudPersons };
