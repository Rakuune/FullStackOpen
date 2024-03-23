require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()

app.use(express.static('dist'))
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

app.get('/api/persons', (req, response) => {
	Person.find({}).then((persons) => {
		response.json(persons)
	})
})

app.post('/api/persons', async (request, response, next) => {
	const { name, number } = request.body
	if (!name || !number) {
		return response.status(400).json({ error: 'Name or Number is missing' })
	}

	try {
		const existingPerson = await Person.findOne({name: name})
		if (existingPerson) {
			return response.status(400).json({ error: 'Name already exists' })
		}

		const person = new Person({
			name: name,
			number: number,
		})

		const savedPerson = await person.save()
		response.json(savedPerson)
	} catch (error) {
		next(error)
	}
})

app.get('/info', (response) => {
	Person.find({})
		.count()
		.then((count) => {
			response.send(`Phonebook has info for ${count} people.`)
		})
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => {
			next(error)
		})
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end()
		})
		.catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.code === 11000) {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})