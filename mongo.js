const mongoose = require('mongoose')
  
const password = process.argv[2]

const url =
`mongodb+srv://fullstack:${password}@cluster0.caikj.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String, 
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        process.exit(1)
    })
} else {

    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`'${process.argv[3]}' saved to phonebook!`)
        mongoose.connection.close()
    })
}