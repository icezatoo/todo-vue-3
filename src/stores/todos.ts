import type { Todos } from '@/models/todo';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore({
  id: 'todos',
  state: () => ({
    listTodo: [] as Todos[],
  }),
  actions: {
    initTodos(todos: any) {
      this.listTodo = todos;
    },
    addTodo(title: string) {
      this.listTodo = [{ id: uuidv4(), title, completed: false }, ...this.listTodo]
    },
    removeTodo(id: string) {
      this.listTodo = this.listTodo.filter(todo => todo.id !== id)
    },
    activeComplete(id: string) {
      this.listTodo = this.listTodo.map((todo) => todo.id === id ? ({ ...todo, completed: !todo.completed }) : todo)
    }
  }
})
