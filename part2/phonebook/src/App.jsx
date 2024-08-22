import { useState,useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import communicationService from './services/communication';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] =useState('')
  const[search, setSearch] =useState('')
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    const existingPerson = persons.find(person =>person.name === newName);

    if(existingPerson){
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
    
      if(confirmUpdate){
         const updatedPerson = {...existingPerson,number:newNumber};

         communicationService
         .update(existingPerson.id,updatedPerson)
         .then(returnedPerson => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ));
          setNewName('');
          setNewNumber('');
          setMessage(`Updated ${newName}'s number`);
          setTimeout(()=>{
            setMessage(null);
          },5000);
         })
         .catch(error =>{
          console.error('Error updating preson:',error);
          setErrorMessage(error.response.data.error || 'Failed to update person.');
          setTimeout(() => setErrorMessage(null), 5000);
         });
      }
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
        setMessage(`Added ${newName}`);
        setTimeout(()=> {
          setMessage(null);
        },5000);
    })
    .catch(error => {
        console.error('Error adding person: ', error);
        setErrorMessage(error.response.data.error);
          setTimeout(() => setErrorMessage(null), 5000);
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
        setErrorMessage(`Deleted ${person.name}`);
        setTimeout(()=> {
          setErrorMessage(null);
        },5000);
      })
      .catch(error =>{
        console.error('Error deleting person: ', error);
        setErrorMessage(`Failed to delete ${person.name}.`);
        setTimeout(() => setErrorMessage(null), 5000);
      })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
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