import httpClient from '../../api/';

const STORAGE_KEY = 'build-a-bot-vuejs-2.0-younho9';

const cartStorage = {
  fetch: () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
  save: (cart) => localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)),
};

const updateCart = (state, cart) => {
  state.cart = cart;
  cartStorage.save(cart);
};

export default {
  namespaced: true,
  state: {
    cart: [],
    parts: null,
    foo: 'robots-foo',
  },
  mutations: {
    updateCart,
    addRobotToCart(state, robot) {
      updateCart(state, [...state.cart, robot]);
    },
    updateParts(state, parts) {
      state.parts = parts;
    },
  },
  actions: {
    getParts({ commit }) {
      httpClient
        .get('/parts.json')
        .then(({ data }) => {
          commit('updateParts', data);
        })
        .catch(console.error);
    },
    getCart({ commit }) {
      commit('updateCart', cartStorage.fetch());
    },
    addRobotToCart({ commit }, robot) {
      commit('addRobotToCart', robot);
    },
  },
  getters: {
    cartSaleItems(state) {
      return state.cart.filter((item) => item.head.onSale);
    },
    foo(state) {
      return `robots-getter/${state.foo}`;
    },
  },
};
