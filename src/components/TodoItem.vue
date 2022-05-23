<template>
  <div class="flex mb-4 items-center">
    <input type="checkbox" :checked="completed" @change="handleChangeStatus" class="default:ring-2 mr-2" />
    <p class="w-full" :class="{'line-through': completed, 'text-green-500': completed, 'text-black': !completed}">
      {{ title }}
    </p>
    <button
      class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500"
      @click="handleClickRemove"
    >
      Remove
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  emits: ['remove-todo', 'change-status'],
  props: {
    id: String,
    title: String,
    completed: Boolean,
  },
  methods: {
    handleClickRemove() {
      this.$emit('remove-todo', this.$props.id);
    },
    handleChangeStatus() {
      this.$emit('change-status', this.$props.id);
    },
  },
});
</script>
