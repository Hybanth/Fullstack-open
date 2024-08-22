import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response => response.data)
  .catch(error => {
    console.error('Error creating person:', error.response.data.error);
    throw error;
  });
}

const deletePerson = id =>{
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
  
}

const update = (id,updatedPerson) =>{
  const request = axios.put(`${baseUrl}/${id}`,updatedPerson);
  return request.then(response => response.data)
  .catch(error => {
    console.error('Error updating person:', error.response.data.error);
    throw error;
  });
}

export default { getAll, create, deletePerson, update };
