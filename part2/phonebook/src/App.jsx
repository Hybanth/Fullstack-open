import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'1234123412',id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] =useState('')
  const[search, setSearch] =useState('')

  const nameChange = (event) =>{
    setNewName(event.target.value)
   }
  const numberChange = event =>{
     setNewNumber(event.target.value);
   };
   const handleSearchChange = event =>{
     setSearch(event.target.value);
   }; 

  const formHandling = (event) => {
    event.preventDefault();
    const checkDuplicate = persons.some(person =>person.name === newName);
    if(checkDuplicate){
      alert(`${newName} is already added to phonebook`);
    }else{
    const newPerson = { name: newName,number: newNumber };
    setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={search} onChange={handleSearchChange} />
      </div>
      <form onSubmit={formHandling}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>number: <input type="tel" value={newNumber} onChange={numberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
      
    </div>
  )
}

export default App