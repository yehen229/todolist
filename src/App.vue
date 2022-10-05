<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autocomplete="off" autofocus v-model="input"
        @keyup.enter="addTodo">
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" v-model="allDone" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in todos" :key="todo" :class="{ editing: todo === editingTodo, completed: todo.completed }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="deleteTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.text" v-editing-focus="todo === editingTodo"
            @keyup.enter="doneEdit(todo)" @blur="doneEdit(todo)">
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{todos.length}}</strong> {{ todos.length == 1 ? 'item' : 'items' }}
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import './assets/index.css'
import useLocalStorage from './utils/storage.js'

const storage = useLocalStorage()
const useStorage = () => {
  const KEY = 'TODOKEYS'
  const todos = ref(storage.getItem(KEY) || [])
  console.log(todos.value)
  watchEffect(() => {
    storage.setItem(KEY, todos.value)
  })
  return todos
}

const todos = useStorage()
const input = ref('')
const editingTodo = ref(null)


const addTodo = () => {
  const text = input.value && input.value.trim()
  if (text.length === 0) return
  todos.value.unshift({
    text,
    completed: false
  })
  input.value = ''
}

const deleteTodo = todo => {
  const index = selectTodo(todo)
  todos.value.splice(index, 1)
}

const editTodo = todo => {
  editingTodo.value = todo
}

const doneEdit = todo => {
  const index = selectTodo(todo)
  todos.value[index].text = todo.text.trim()
  editingTodo.value = null
}

const selectTodo = todo => {
  return todos.value.indexOf(todo)
}

const vEditingFocus = (el, binding) => {
  binding.value && el.focus()
}



</script>

<style lang="scss" scoped>

</style>