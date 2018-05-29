<template>
  <div>
    <p>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo">
    </p>
    <ul>
      <li v-for="todo in todos"
        class="todo"
        :key="todo.id">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed">
          <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
        <input class="edit" type="text"
          v-model="todo.title"
          v-todo-focus="todo == editedTodo"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.esc="cancelEdit(todo)">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTodo: '',
      editedTodo: null,
      visibility: 'all'
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos.todos
    }
  },
  watch: {
    todos: {
      handler () {
        this.$store.commit('todos/saveStorage')
      },
      deep: true
    }
  },
  methods: {
    addTodo () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$store.commit('todos/add', {
        title: value,
        completed: false
      })
      this.newTodo = ''
    },
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo)
    },
    editTodo (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },
    cancelEdit (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    removeCompleted () {
      this.$store.commit('todos/removeCompleted')
    }
  },
  directives: {
    todoFocus (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
