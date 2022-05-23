<template>
  <div class="flex mt-4">
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
      placeholder="Add Todo"
      type="text"
      v-model="newTodo"
    />
    <button
      class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500"
      @click="handleClick"
    >
      Add
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  emits: ['add-todo'],
  props: {
    message: String,
  },
  data() {
    return {
      newTodo: '',
    };
  },
  methods: {
    handleClick() {
      this.$emit('add-todo', this.newTodo);
      this.newTodo = '';
    },
  },
});
</script>
