<template>
  <main>
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">Todo List</h1>
          <TodoInput @add-todo="handleAddTodo" />
        </div>
        <div v-if="!isLoading">
          <template v-if="listTodo.length">
            <template v-for="(todo, index) in listTodo" :key="index">
              <TodoItem
                :title="todo.title"
                :id="todo.id"
                :completed="todo.completed"
                @remove-todo="handleRemoveTodo"
                @change-status="handleChangeStatus"
              />
            </template>
          </template>
          <h1 class="text-grey-darkest" v-else>No results found</h1>
        </div>
        <div class="flex items-center justify-center" v-else>
          <Loading />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import TodoItem from './components/TodoItem.vue';
import TodoInput from './components/TodoInput.vue';
import Loading from './components/Loading.vue';
import {useQuery} from 'villus';
import type {Todos} from './models/todo';
import {useTodoStore} from './stores/todos';

export default defineComponent({
  name: 'application-todo',
  setup() {
    const GetPosts = `
      query TodoList($option : PageQueryOptions) {
        todos(options : $option) {
           data {
             id
             title
             completed
            }
         }
      }
    `;

    const {data, isFetching} = useQuery({
      query: GetPosts,
      variables: {
        option: {
          paginate: {
            page: 1,
            limit: 10,
          },
        },
      },
    });

    const todosStore = useTodoStore();

    return {data, isFetching, todosStore};
  },
  components: {
    TodoItem,
    TodoInput,
    Loading,
  },
  computed: {
    listTodo(): Todos[] {
      return this.todosStore.listTodo;
    },
    isLoading(): boolean {
      return this.isFetching;
    },
  },
  watch: {
    data() {
      const todos: Todos[] = this.data?.todos?.data || [];
      this.todosStore.initTodos(todos);
    },
  },

  methods: {
    handleAddTodo(title: string) {
      this.todosStore.addTodo(title);
    },
    handleRemoveTodo(id: string) {
      this.todosStore.removeTodo(id);
    },
    handleChangeStatus(id: string) {
      this.todosStore.activeComplete(id);
    },
  },
});
</script>

<style>
@import './assets/base.css';

#app {
  height: 100vh;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
</style>
