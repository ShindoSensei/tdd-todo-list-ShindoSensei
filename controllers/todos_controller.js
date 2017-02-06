const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed

function create (params) {
  if (params.hasOwnProperty('name') && params.hasOwnProperty('description') && params.hasOwnProperty('completed') && params.name.length >= 5) {
    params['_id'] = uuidGenerator()
    todos.push(params)
    return true
  } else {
    return false
  }
}

// READ (list & show)
  // return array of all todos
function list () {
  return todos
}

// find the TODO with this id
// Should return the Todo Object with the specified id
// Should return null if no TODO with that id exists
function show (id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]['_id'] === id) {
      return todos[i]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
// Should be able to update the Todo with the given id, using the following KVPs (Key-Value Pairs) in the updatedParams object:
// name
// description
// completed (true/false)
// Should allow individual fields to be updated
// Should NOT allow a name to be changed to blank or less than 5 characters in length
// Should return true if an update is successful, false if otherwise
function update (id, updatedParams) {
  if (updatedParams.name.length < 5) {
    return false
  }
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]['_id'] === id) {
      todos[i].name = updatedParams.name
      todos[i].description = updatedParams.description
      todos[i].completed = updatedParams.completed
      return true
    }
  }
  return false
}

// Should be able to delete the Todo with the given id
// Should return true if the delete is successful, false if otherwise
function destroy (id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]['_id'] === id) {
      todos.splice(i, 1)
      return true
    }
  }
  return false
}
// [0,1,2,3,4]

// Should be able to delete all the Todos and return true
function destroyAll () {
  for (var i = todos.length; i >= 0; i--) {
    todos.pop()
  }
  return true
}
module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
