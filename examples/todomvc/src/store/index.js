import Vue from 'vue';
import Vuex from 'vuex';
import { STORAGE_KEY } from '../constants';
import { filters } from '../utils';

Vue.use(Vuex);

const todoStorage = {
  fetch: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  save: (todos) => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)),
};

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [],
  },
  getters: {
    remaining: (state) => {
      return filters.active(state.todos).length;
    },
  },
  mutations: {
    addTodo(state, title) {
      state.todos.push({
        id: new Date().getTime(),
        title,
        completed: false,
      });
    },
    removeTodo(state, todo) {
      state.todos = state.todos.filter((t) => t.id !== todo.id);
    },
    updateTodo(state, todo) {
      state.todos = state.todos.map((t) => (t.id === todo.id ? todo : t));
    },
    updateTodos(state, todos) {
      state.todos = todos;
    },
    saveTodos(state) {
      todoStorage.save(state.todos);
    },
    removeCompleted(state) {
      state.todos = filters.active(state.todos);
    },
  },
  actions: {
    fetchTodos({ commit }) {
      commit('updateTodos', todoStorage.fetch());
    },
    saveTodos({ commit }) {
      commit('saveTodos');
    },
  },
});
