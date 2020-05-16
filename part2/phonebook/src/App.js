import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const Filter = ({ value, onChange }) => (
  <form onSubmit={e => e.preventDefault()}>
    <div>filter shown with: <input value={value} onChange={e => onChange(e.target.value)} /></div>
  </form>
);

const PersonForm = ({ onSubmit, name, onChangeName, number, onChangeNumber }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={name} onChange={e => onChangeName(e.target.value)} /></div>
    <div>number: <input value={number} onChange={e => onChangeNumber(e.target.value)} /></div>
    <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({ filter, persons }) => {
  const personsFiltered = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <table>
      <tbody>
        {personsFiltered.map(person =>
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const App = ({ phones }) => {
  // Initial state
  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    Axios
      .get("http://localhost:3001/persons")
      .then(({ data }) => setPersons(data));
  }, []);

  // Add a new phone number to the list
  const addPhone = event => {
    event.preventDefault();

    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    const person = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(person));
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={setFilter} />

      <h3>add a new</h3>

      <PersonForm
        onSubmit={addPhone}
        name={newName}
        onChangeName={setNewName}
        number={newNumber}
        onChangeNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App
