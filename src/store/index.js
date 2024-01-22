import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    objects: [],

  },
  getters: {
    getObjects(state) {
      return state.objects;
    }
  },
  mutations: {
    addObject(state, newObject) {
      state.objects.push(newObject);
    },
    setObjects(state, objects) {
      state.objects = objects;
    }
  },
  actions: {
    async fetchObjects({ commit }) {
      const res = await axios.get("http://127.0.0.1:5000/objects");
      commit('setObjects', res.data);
      console.log(res.data)

    },
    async createObject({ commit, dispatch }, newObject) {
      const res = await axios.post("http://127.0.0.1:5000/objects", newObject);
      commit('addObject', res.data);
      dispatch('fetchObjects')
    }
  },
})
