<template>
  <li
    class="todo"
    :key="todo.id"
    :class="{ completed: todo.completed, editing: todo == editingTodo }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        @change="toggleCompleted(todo)"
      />
      <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      class="edit"
      type="text"
      v-model="editingTodoTitle"
      v-todo-focus
      @blur="doneEdit(editingTodoTitle)"
      @keyup.esc="cancelEdit"
      @keyup.enter="doneEdit(editingTodoTitle)"
    />
  </li>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      editingTodoTitle: '',
      editingTodo: null,
    };
  },
  methods: {
    toggleCompleted(todo) {
      this.updateTodo({ ...todo, completed: !todo.completed });
    },
    editTodo(todo) {
      this.editingTodo = todo;
      this.editingTodoTitle = todo.title;
    },
    doneEdit(editingTodoTitle) {
      if (!this.editingTodo) {
        return;
      }

      editingTodoTitle = editingTodoTitle.trim();

      if (!editingTodoTitle) {
        this.removeTodo(this.editingTodo);
      } else {
        this.updateTodo({
          ...this.editingTodo,
          title: editingTodoTitle,
        });
      }

      this.editingTodo = null;
    },
    cancelEdit() {
      this.editingTodo = null;
      this.editingTodoTitle = '';
    },
    ...mapMutations(['updateTodo', 'removeTodo']),
  },
  directives: {
    'todo-focus'(el) {
      el.focus();
    },
  },
};
</script>
