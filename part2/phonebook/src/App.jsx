import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    
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
     <Filter search={search} handleSearchChange={handleSearchChange} />
      <PersonForm  newName={newName} 
        newNumber={newNumber}
        handleNameChange={nameChange}
        handleNumberChange={numberChange}
        handleSubmit={formHandling} />
      <h2>Numbers</h2>
      <Persons contactsToShow={personsToShow} />
      
    </div>
  )
}

export default App