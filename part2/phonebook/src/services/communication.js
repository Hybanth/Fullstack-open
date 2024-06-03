import axios from 'axios';

const baseurl = 'http://localhost:3001/persons';

const getAll = () =>{
   return axios.get(baseurl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
  }

  export default {getAll,create}