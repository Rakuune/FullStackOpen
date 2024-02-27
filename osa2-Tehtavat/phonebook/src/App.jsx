import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/numbers'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numberService
      .getAll()
      .then(responseData => {
        console.log('Fetched data: ', responseData)
        setPersons(responseData);
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const deleteNumber = id => {
    const person = persons.find(p => p.id === id)
    if (person) {
      if (window.confirm(`Delete ${person.name}?`)) {
        numberService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          })
      }
    } else {
      console.log('Person not found', id)
    }
  }
  console.log("Persons array:", persons)

  const filteredPersons = persons.filter(person => {
    if (!person) {
      console.warn("Undefined person found:", person)
      return false;
    }
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }

      numberService.create(nameObject)
        .then(response => {
          if (response) {
            setPersons(persons.concat(response))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${response.name}`);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        })
        .catch(error => {
          console.error('Error adding person:', error)
          alert('An error occurred while adding the person.')
        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter currentValue={filter} onFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={deleteNumber} />
    </div>
  );
}

export default App
