import Vue from 'vue';
import Router from 'vue-router';
import App from '../App.vue';
import { FILTERS } from '../constants';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
    },
    ...Object.keys(FILTERS).map((filter) => ({
      path: `/${filter}`,
      component: App,
    })),
    {
      path: '*',
      redirect: '/',
    },
  ],
});
