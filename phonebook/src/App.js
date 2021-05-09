import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchKey, setSearchKey] = useState("");

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
    oldPersons.push({ name: newName, number: newNumber });
    setPersons(oldPersons);
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = () => {
    return searchKey
      ? persons.filter((filter) =>
          filter.name.toLowerCase().includes(searchKey.toLowerCase())
        )
      : persons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown up with:
        <input
          value={searchKey}
          onChange={(event) => setSearchKey(event.target.value)}
        />
      </div>
      <form onSubmit={handleAddName}>
        <div>
          name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons().map((person) => (
        <div key={person.name}>
          {person.name}
          {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
