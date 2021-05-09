import React, { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      Filter shown up with:
      <input value={value} onChange={handleChange} />
    </div>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name}-{person.number}{" "}
      <Button text="delete" handleClick={() => handleDelete(person)} />
    </div>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleAddName = (event) => {
    event.preventDefault();
    let oldPersons = [...persons];
    if (!newName || !newNumber) {
      alert("Name or Number can not be empty");
      return;
    }
    if (oldPersons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    personService
      .create({ name: newName, number: newNumber })
      .then((person) => {
        oldPersons.push(person);
        setPersons(oldPersons);
        setNewName("");
        setNewNumber("");
      });
  };

  const filteredPersons = () => {
    return searchKey
      ? persons.filter((filter) =>
          filter.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      : persons;
  };

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      personService.delete(id).then(() => {
        const updatedPerson = persons.filter((person) => person.id !== id);
        setPersons(updatedPerson);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={searchKey}
        handleChange={(event) => setSearchKey(event.target.value)}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        handleSubmit={handleAddName}
      />
      <Persons persons={filteredPersons()} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
