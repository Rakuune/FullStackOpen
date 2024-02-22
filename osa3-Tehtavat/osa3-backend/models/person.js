const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (v) => {
  const split = v.split('-')
  return split.length === 2 && split[0].length > 1 && split[0].length < 4
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 1,
    required: true,
    unique: true,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)