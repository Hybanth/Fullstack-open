   const Persons = ({contactsToShow, handleDelete}) =>{
   return( 
    <ul>
        {contactsToShow.map(person => (
        <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
            </li>))}
    </ul>
    );
};

export default Persons;
