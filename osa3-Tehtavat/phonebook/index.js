const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())
let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: "1"
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: "2"
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: "3"
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: "4"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.post('/api/persons', (request, response) => {
    const {name, number} = request.body
    if (!name || !number) {
        return response.status(400).json({error: 'Name or Number is missing'})
    }

    const nameExists = persons.some(person => person.name.toLowerCase() === name.toLowerCase())
    if(nameExists) {
        return response.status(400).json({error: 'Name already exists'})
    }

    let id
    do {
        id = Math.floor(Math.random() * 1000000)
    } while (persons.find(p => p.id === id.toString()))

    const newPerson = { name, number, id: id.toString() }
    persons.push(newPerson)

    console.log(newPerson)
    response.json(newPerson)
})
app.get('/info', (request, response) => {
    let numberOfObjects = persons.length
    const currentTime = new Date()
    const formattedTime = currentTime.toString()
    response.send(`
    <p>Phonebook has info for ${numberOfObjects} people</p>
    <p>${formattedTime}</p>
    `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})