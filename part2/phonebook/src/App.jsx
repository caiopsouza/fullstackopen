import {useState} from 'react'

const Filter = ({nameFilter, setNameFilter}) => {
    return (<>
        <label>filter shown with
            <input name="filter" value={nameFilter}
                   onChange={(event) => setNameFilter(event.target.value)}/>
        </label>
    </>);
}

const PersonForm = ({addName, newName, setNewName, newNumber, setNewNumber}) => {
    return (<>
        <form onSubmit={addName}>
            <div>
                <label>
                    name:
                    <input name="name" autoComplete="off" value={newName}
                           onChange={(event) => setNewName(event.target.value)}/>
                </label>
            </div>
            <div>
                <label>
                    number:
                    <input name="number" autoComplete="off" value={newNumber}
                           onChange={(event) => setNewNumber(event.target.value)}/>
                </label>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>)
}

const Numbers = ({filter, persons}) => {
    const filterUpper = filter.toUpperCase();
    const personsFiltered = filter ?
        persons.filter(p => p.name.toUpperCase().includes(filterUpper)) :
        persons;

    return (<>
        {personsFiltered.map(p =>
            <div key={p.name}>
                {p.name} {p.number}
            </div>)
        }
    </>);
}

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const addName = (event) => {
        event.preventDefault();

        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newId = persons.length;
        setPersons(persons.concat({name: newName, number: newNumber, id: newId}));

        setNewName('');
        setNewNumber('');
    }

    return (<>
        <h2>Phonebook</h2>
        <Filter nameFilter={nameFilter} setNameFilter={setNameFilter}/>

        <h3>Add a new</h3>
        <PersonForm
            addName={addName}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}/>

        <h3>Numbers</h3>
        <Numbers filter={nameFilter} persons={persons}/>
    </>);
}

export default App;