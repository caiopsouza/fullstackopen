import {useEffect, useState} from 'react'
import phoneService from "./services/phoneService.js";

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

const Numbers = ({filter, persons, handleDelete}) => {
    const filterUpper = filter.toUpperCase();
    const personsFiltered = filter ?
        persons.filter(p => p.name.toUpperCase().includes(filterUpper)) :
        persons;

    return (<>
        {personsFiltered.map(p =>
            <div key={p.name}>
                {p.name} {p.number}
                <button onClick={() => handleDelete(p.id)}>delete</button>
            </div>)
        }
    </>);
}

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const addName = (event) => {
        event.preventDefault();

        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const person = {name: newName, number: newNumber};
        phoneService.post(person)
            .then(response => {
                console.log(response);
                setPersons(persons.concat(response.data));

                setNewName('');
                setNewNumber('');
            });
    }

    useEffect(() => {
        phoneService.getAll()
            .then(response => setPersons(response.data))
    }, []);

    const handleDelete = (id) => {
        const person = persons.find(person => person.id === id);
        if (!window.confirm(`Delete ${person.name}?`))
            return;

        phoneService.remove(id)
            .then(response => {
                console.log(response);
                setPersons(persons.filter(person => person.id !== id));
            });
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
        <Numbers filter={nameFilter} persons={persons} handleDelete={handleDelete}/>
    </>);
}

export default App;
