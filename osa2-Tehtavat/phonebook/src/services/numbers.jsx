import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
    .catch(error =>{
      console.error('Error fetching data: ', error)
      return[]
    })
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .then(response => {
      console.log('Response from server:', response)
      return response.data
    })
    .catch(error => {
      console.error('Error creating entry:', error);
      return null;
    })
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating entry:', error);
      return null;
    })
}

  const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

  export default { getAll, create, update, remove }