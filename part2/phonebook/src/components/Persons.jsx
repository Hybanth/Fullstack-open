   const Persons = ({contactsToShow}) =>{
   return( 
    <ul>
        {contactsToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </ul>
    );
};

export default Persons;
