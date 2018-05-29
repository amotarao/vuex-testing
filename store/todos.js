// localStorage persistence
const STORAGE_KEY = 'todos-vuejs-2.0'
const todoStorage = {
  fetch () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
const filters = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter( todo => !todo.completed )
  },
  completed (todos) {
    return todos.filter( todo => todo.completed )
  }
}

export const state = () => ({
  todos: todoStorage.fetch()
})

export const mutations = {
  add (state, todo) {
    state.todos.push(todo)
  },
  remove (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  saveStorage (state, todos) {
    todoStorage.save(state.todos)
  },
  removeCompleted (state) {
    state.todos = filters.active(state.todos)
  }
}
