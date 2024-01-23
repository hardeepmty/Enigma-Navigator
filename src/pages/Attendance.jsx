import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Attendance() {
  const [names, setNames] = useState([]);
  const [absentMembers, setAbsentMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => setNames(response.data))
      .catch(error => console.error('Error fetching names:', error));
  }, []);

  const toggleAbsentStatus = (id, name) => {
    const updatedNames = names.map(person =>
      person._id === id ? { ...person, present: !person.present } : person
    );

    setNames(updatedNames);

    if (!names.find(person => person._id === id).present) {
      setAbsentMembers([...absentMembers, name]);
    } else {
      setAbsentMembers(absentMembers.filter(member => member !== name));
    }
  };

  return (
    <div>
      <h2 style={{color:"white", backgroundColor:"skyblue"}}>All Members:</h2>
      <ul style={{color:"white", backgroundColor:"green"}}>
        {names.map(person => (
          <li key={person._id} onClick={() => toggleAbsentStatus(person._id, person.name)}>
            {person.name}
          </li>
        ))}
      </ul>
      <h2 style={{color:"white", backgroundColor:"red"}}>Absent Members:</h2>
      <ul style={{color:"white", backgroundColor:"black"}}>
        {absentMembers.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;

