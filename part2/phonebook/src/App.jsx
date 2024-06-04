import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import communicationService from './services/communication';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] =useState('')
  const[search, setSearch] =useState('')

  useEffect(() => {
    communicationService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const nameChange = event =>{
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
    const newPerson = {
      name: newName,
      number: newNumber
    };
    communicationService
    .create(newPerson)
      .then(addedAPerson => {
        setPersons(persons.concat(addedAPerson));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.error('Error adding person: ', error);
      });
    }
  }

  const handleDelete = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)){
      communicationService
      .deletePerson(id)
      .then(()=>{
        setPersons(persons.filter(p=>p.id !== id));
      })
      .catch(error =>{
        console.error('Error deleting person: ', error);
      })
    }
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
        <Persons contactsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App