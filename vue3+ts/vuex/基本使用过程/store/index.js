import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state) {
      this.counter++;
    },
    increment(state) {
      this.counter--;
    },
  },
});

export default store;
