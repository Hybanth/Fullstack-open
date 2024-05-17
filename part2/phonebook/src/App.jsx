import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const nama = (event) =>{
    event.preventDefault()
    console.log("add clicked", event.target)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={nama}>
        <div>
          name: <input value="" />
        </div>
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      
    </div>
  )
}

export default App