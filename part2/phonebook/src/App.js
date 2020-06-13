import React, { useState, useEffect, useCallback } from "react";
import personService from "./services/person";

const NotificationType = {
  Success: "success",
  Error: "error",
};

const Notification = ({ type, message }) => {
  if (!message) return null;
  return <div className={`notification ${type}`}>{message}</div>;
};

const Filter = ({ value, onChange }) => (
  <form onSubmit={(e) => e.preventDefault()}>
    <div>
      filter shown with:{" "}
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  </form>
);

const PersonForm = ({
  onSubmit,
  name,
  onChangeName,
  number,
  onChangeNumber,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name:{" "}
      <input value={name} onChange={(e) => onChangeName(e.target.value)} />
    </div>
    <div>
      number:{" "}
      <input value={number} onChange={(e) => onChangeNumber(e.target.value)} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ filter, persons, onDelete }) => {
  const personsFiltered = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <table>
      <tbody>
        {personsFiltered.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => onDelete(person)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = ({ phones }) => {
  // Initial state
  const [persons, setPersonsOriginal] = useState([]);
  const [filter, setFilter] = useState("");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] = useState(
    NotificationType.Success
  );

  // Persons are always displayed in order
  const setPersons = (persons) =>
    setPersonsOriginal(persons.sort((a, b) => a.name.localeCompare(b.name)));

  // Notifications are displayed temporarily
  const setNotification = (type, message) => {
    setNotificationType(type);
    setMessage(message);
    setTimeout(() => setMessage(null), 5000);
  };

  const setNotificationSuccess = (message) =>
    setNotification(NotificationType.Success, message);

  const setNotificationError = useCallback(
    (message) => setNotification(NotificationType.Error, message),
    []
  );

  // Initial load from the server
  useEffect(() => {
    personService
      .getAll()
      .then(({ data }) => setPersons(data))
      .catch((_) =>
        setNotificationError(
          "Phonebook not available. Please, try again later."
        )
      );
  }, [setNotificationError]);

  // Add a new phone number to the list
  const addPhone = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

    const personMatch = persons.find(({ name }) => name === newName);

    // Already exists. Just edit it.
    if (personMatch) {
      const shoudlReplace = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      );

      if (shoudlReplace) {
        personService
          .update(personMatch.id, person)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id === personMatch.id ? response.data : p))
            );
            setNotificationSuccess(`Updated ${response.data.name}`);
          })
          .catch((_) =>
            setNotificationError(
              `Information of ${personMatch.name} has already been removed from the server`
            )
          );
      }

      return;
    }

    // Doesn't exist. Add.
    personService
      .create(person)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNotificationSuccess(`Added ${response.data.name}`);
      })
      .catch((_) =>
        setNotificationError(
          "Error adding person to phonebook. Please, try again later."
        )
      );
  };

  // Remove a person from the list
  const removePerson = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (!result) return;

    personService
      .remove(person.id)
      .then((_) => {
        setPersonsOriginal(persons.filter((p) => p.id !== person.id));
        setNotificationSuccess(`Deleted ${person.name}`);
      })
      .catch((_) =>
        setNotificationError(
          `Information of ${person.name} has already been removed from the server`
        )
      );
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification type={notificationType} message={message} />

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
  );
};

export default App;
