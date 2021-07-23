<template>
  <li>
    <RouterLink :to="to" :class="{ selected: isSelected }">{{
      filterTitle
    }}</RouterLink>
  </li>
</template>

<script>
import { capitalize } from '../utils';

export default {
  props: {
    filter: String,
    currentFilter: String,
  },
  computed: {
    to() {
      return `/${this.filter}`;
    },
    isSelected() {
      return this.filter === this.currentFilter;
    },
    filterTitle() {
      return capitalize(this.filter);
    },
  },
};
</script>
