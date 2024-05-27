import { createStore } from 'vuex'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    objects: [],
    isAuthorized: false,
    token: '',
    users: []
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
    },
    getUsers(state) {
      return state.users
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
    },
    addUser(state, newUser) {
      state.users.push(newUser)
    },
    setUser(state, users) {
      state.users = users
    }
  },
  actions: {
    async fetchObjects({ commit }, token) {
      const res = await axios.get("https://sl1degod.ru/objects", {headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      commit('setObjects', res.data);
      console.log("11" + token)
    },

    async getUsers({ commit }, token) {
      const res = await axios.get("https://sl1degod.ru/users", {headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
      commit('setUser', res.data);
      console.log("11" + token)
    },

    async createObject({ commit, dispatch }, {newObject, token}) {
      const res = await axios.post("https://sl1degod.ru/objects", newObject ,{
        headers: {
          'Authorization': `Bearer ${token}`}});
      commit('addObject', res.data);
      dispatch('fetchObjects', token)
    },

    async createUser({ commit, dispatch }, {newUser, token}) {
      const res = await axios.post("https://sl1degod.ru/users", newUser ,{
        headers: {
          'Authorization': `Bearer ${token}`}});
      commit('addUser', res.data);
      dispatch('getUsers', token)
    },

    async changeAuthStatus({ commit }, status) {
      commit('setAuthStatus', status)
    },


  },
  plugins: [
    createPersistedState()
  ]
})

