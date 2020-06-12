import React, { useState, useEffect } from 'react'
import personService from './services/person'

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

const Persons = ({ filter, persons, onDelete }) => {
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
            <td><button onClick={() => onDelete(person)}>Delete</button></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const App = ({ phones }) => {
  // Initial state
  const [persons, setPersonsOriginal] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const setPersons = (persons) => setPersonsOriginal(persons.sort((a, b) => a.name.localeCompare(b.name)))

  useEffect(() => {
    personService
      .getAll()
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
      name: newName,
      number: newNumber
    };

    personService
      .create(person)
      .then(response => setPersons(persons.concat(response.data)))
      .catch(_ => alert('Error adding person to phonebook. Please, try again later.'));
  }

  // Remove a person from the list
  const removePerson = person => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (!result) return;

    personService
      .remove(person.id)
      .then(_ => setPersonsOriginal(persons.filter(p => p.id !== person.id)))
      .catch(_ => alert('Error removing person from phonebook. Please, try again later.'));
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

      <Persons filter={filter} persons={persons} onDelete={removePerson} />
    </div>
  )
}

export default App
