<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="createTodo"
        />
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDone"
        />
        <label for="toggle-all"></label>
        <ul class="todo-list">
          <todo-item
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
          />
        </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remainingText }} left
        </span>
        <ul class="filters">
          <TodoFilter
            v-for="(filter, index) in FILTERS"
            :key="index"
            :filter="filter"
            :currentFilter="currentFilter"
          />
        </ul>
        <button
          class="clear-completed"
          @click="removeCompleted"
          v-show="todos.length > remaining"
        >
          Clear completed
        </button>
      </footer>
    </section>
    <TodoFooter />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { filters, removeForwardSlash } from './utils';
import { FILTERS } from './constants';
import TodoFooter from './components/TodoFooter.vue';
import TodoItem from './components/TodoItem.vue';
import TodoFilter from './components/TodoFilter.vue';

export default {
  components: {
    TodoItem,
    TodoFilter,
    TodoFooter,
  },
  data() {
    return {
      newTodo: '',
      editingTodoTitle: '',
      editingTodo: null,
      FILTERS,
    };
  },

  watch: {
    todos: {
      handler() {
        this.saveTodos();
      },
      deep: true,
    },
  },

  created() {
    this.fetchTodos();
  },

  computed: {
    ...mapState(['todos']),
    ...mapGetters(['remaining']),
    currentFilter() {
      const pathname = removeForwardSlash(this.$route.path);
      return pathname === '' ? FILTERS.all : pathname;
    },
    filteredTodos() {
      return filters[this.currentFilter](this.todos);
    },
    remainingText() {
      return this.remaining === 1 ? 'item' : 'items';
    },
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.updateTodos(
          this.todos.map((todo) => ({ ...todo, completed: value })),
        );
      },
    },
  },

  methods: {
    createTodo() {
      const value = this.newTodo.trim();

      if (!value) {
        return;
      }

      this.addTodo(value);
      this.newTodo = '';
    },
    ...mapMutations([
      'updateTodos',
      'addTodo',
      'removeTodo',
      'removeCompleted',
    ]),
    ...mapActions(['fetchTodos', 'saveTodos']),
  },
};
</script>
