import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'1234123412' }
  ]) 
  const [newName, setNewName] = useState('')

  const nameChange = (event) =>{
   setNewName(event.target.value)
  }
  const numberChange = event =>{
    setNewNumber(event.target.value);
  };

  const[newNumber, setNewNumber] =useState('')

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
  

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
      
    </div>
  )
}

export default App