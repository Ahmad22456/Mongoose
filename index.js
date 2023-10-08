const mongoose = require('mongoose')
require('dotenv').config()

const UserSchema = require('./UserSchema')

mongoose.connect(`${process.env.MONGO_URI}/Users`)
    .then(() => console.log("working"))
    .catch((e) => console.log(e.message))

// Create and Save a Record of a Model
async function addPerson(user) {
    const person = new UserSchema(user)
    await person.save()
    console.log(person)
}

// Create Many Records with model.create()
async function addPersonMany(users) {
    const persons = await UserSchema.create(users)
    console.log(persons)
}

// Use model.find() to Search Your Database
async function findPerson(condition) {
    const personFound = await UserSchema.find(condition)
    console.log(personFound)
}

// Use model.findOne() to Return a Single Matching Document from Your Database
async function findOnePerson(condition) {
    const personFound = await UserSchema.findOne(condition)
    console.log(personFound)
}

// Use model.findById() to Search Your Database By _id
async function findPersonId(condition) {
    const personFound = await UserSchema.findById(condition)
    console.log(personFound)
}

// Perform Classic Updates by Running Find, Edit, then Save
async function findPersonIdUpdate(condition, modification) {
    const personFound = await UserSchema.findByIdAndUpdate(condition, modification)
    console.log(personFound)
}

// Perform New Updates on a Document Using model.findOneAndUpdate()
async function findOnePersonUpdate(condition, modification) {
    const personFound = await UserSchema.findOneAndUpdate(condition, modification, {new: true})
    console.log(personFound)
}

// Delete One Document Using model.findByIdAndRemove
async function findPersonIdDelete(condition) {
    const personFound = await UserSchema.findByIdAndDelete(condition)
    console.log(personFound)
}

// MongoDB and Mongoose - Delete Many Documents with model.remove()
async function PersonDelete(condition) {
    const personFound = await UserSchema.deleteMany(condition)
    console.log(personFound)
}

// Chain Search Query Helpers to Narrow Search Results
async function PersonQuery(condition) {
    const personFound = await UserSchema.where(condition).sort({name: 1}).limit(2).select({age: false})
    console.log(personFound)
}

addPerson({name: 'someBody', age: 20, favoriteFoods: ['grapes', 'apples', 'watermelon', 'burritos']})

addPersonMany([{name: 'someOne', age: 15, favoriteFoods: ['chicken', 'beef', 'fish', 'burritos']},
{name: 'someThing', age: 45, favoriteFoods: ['cucumber', 'tomato', 'carrot', 'burritos']},
{name: 'someBody', age: 40, favoriteFoods: ['water', 'pepsi', 'redbull', 'burritos']}])

findPerson({name : 'someBody'})   // this goes first

findOnePerson({favoriteFoods : 'tomato'})

findPersonId({_id: '652329c1f3ba5bcc0d630e19'})

findPersonIdUpdate({_id: '652329c1f3ba5bcc0d630e1a'}, {$push: {favoriteFoods: 'hamburger'}}) // updated but displayed the old one

findOnePersonUpdate({name: 'someThing'}, {$set: {age: 20}})

findPersonIdDelete({_id: '652329c1f3ba5bcc0d630e1a'})

PersonDelete({name: 'someBody'})

PersonQuery({favoriteFoods: 'burritos'})