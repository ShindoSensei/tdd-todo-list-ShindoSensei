const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

// Write assert test to see if create(params) does the following,
// Should be able to create a new Todo with the following KVPs (Key-Value Pairs) in the params object:
// name
// description
// completed (true/false)
// Should automatically create an _id property for each new TODO and assign it a UUID
// Should be able to create a new Todo with just name, sensible defaults will be used for other fields.
// Should NOT be able to create a new Todo without a name being provided
// Should NOT allow a name less than 5 characters long

var params = {
  name: 'names',
  description: 'Do it',
  completed: false
}

var noName = {
  description: 'Do it',
  completed: false
}

var shortName = {
  name: 'name',
  description: 'Do it',
  completed: false

}

// Testing Create function
assert.strictEqual(todos.create(params), true, 'Create should return an object when run')

assert.strictEqual(todos.create(noName), false, 'Parameter object needs to have name property')

assert.strictEqual(todos.create(shortName), false, 'Parameter object name needs to be at least 5 characters long')

// Testing list function
assert.ok(todos.list().length > 0, 'List should return an array of all todos')

// Test show function

assert.deepStrictEqual(todos.show(todos.list()[0]['_id']), params, 'Show function should return the Todo Object with the specified id')

// Test update function

var updatedObj = {
  name: 'newName',
  description: 'Do not do it',
  completed: false
}

var firstObjId = todos.list()[0]['_id']

assert.strictEqual(todos.update(firstObjId, updatedObj), true, 'Object with unique ID is not updated'
)

assert.strictEqual(todos.update(firstObjId, shortName), false, 'Updated parameter name value should be at least 5 characters long.'
)

// Test destroy function
assert.strictEqual(todos.destroy(firstObjId), true, 'Todo with given id not destroyed')

assert.strictEqual(todos.destroy(123), false, 'Todo with given id not destroyed')

// Test destroyAll() function
todos.destroyAll()
assert.ok(todos.list().length === 0, 'Destroy All should have no object in todos')
