import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    objects: [],
    isAuthorized: false,
    token: ''
  },
  getters: {
    getObjects(state) {
      return state.objects;
    },
    getIsAuthorized(state) {
      return state.isAuthorized;
    },
    getToken(state) {
      return state.token
    }
  },
  mutations: {
    addObject(state, newObject) {
      state.objects.push(newObject);
    },
    setObjects(state, objects) {
      state.objects = objects;
    },
    setAuthStatus(state, status) {
      state.isAuthorized = status
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async fetchObjects({ commit }, token) {
      const res = await axios.get("http://127.0.0.1:5000/objects", {headers: {
          'Authorization': `Bearer ${token}`}});
      commit('setObjects', res.data);
    },
    async createObject({ commit, dispatch }, {newObject, token}) {
      const res = await axios.post("http://127.0.0.1:5000/objects", newObject ,{
        headers: {
          'Authorization': `Bearer ${token}`}});
      commit('addObject', res.data);
      dispatch('fetchObjects', token)
    },
    async changeAuthStatus({ commit }, status) {
      commit('setAuthStatus', status)
    }
  },
})