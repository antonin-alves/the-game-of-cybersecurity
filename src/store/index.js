import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
var data = require('./questions.json')

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loading: false,
    Question: [],
    current: 0,
    selectedIndex: null,
    shuffledAnswers: [],
    correctIndex: null,
    correctAnswers: 0,
    answered: false,
    difficultyLevel: null
  },
  mutations: {
    START_LOADING (state) {
      state.loading = true
    },
    STOP_LOADING (state) {
      state.loading = false
    },
    SET_QUESTION (state, data) {
      state.Question = data
    },
    NEXT (state) {
      state.current++
    },
    SELECTED_ANSWER (state, index) {
      console.log(index)
      state.selectedIndex = index
    },
    RESET (state) {
      state.selectedIndex = null
      state.answered = false
    },
    SHUFFLE_ANSWER (state) {
      var Options
      Options = _.concat(state.Question[state.current].incorrect_answers, state.Question[state.current].correct_answer)
      state.shuffledAnswers = _.shuffle(Options)
      state.correctIndex = state.shuffledAnswers.indexOf(state.Question[state.current].correct_answer)
    },
    SUBMIT (state, iscorrect) {
      if (iscorrect) {
        state.correctAnswers++
      }
      state.answered = true
    },
    RESETQUIZ (state) {
      state.current = 0
      state.correctAnswers = 0
    },
    SET_DIFFICULTY (state, difficulty) {
      state.difficultyLevel = difficulty
    }
  },
  actions: {
    next: ({ commit }) => {
      commit('NEXT')
    },
    selectedAnswer: ({ commit }, index) => {
      commit('SELECTED_ANSWER', index)
    },
    submit: ({ commit, state }) => {
      let iscorrect = false
      if (state.selectedIndex === state.correctIndex) {
        iscorrect = true
      }
      commit('SUBMIT', iscorrect)
    },
    resetQuiz: ({ commit }) => {
      commit('RESETQUIZ')
    },
    beginQuiz: ({ commit, state }, difficulty) => {
      commit('SET_DIFFICULTY', difficulty)
      commit('START_LOADING')
      commit('SET_QUESTION', data.results)
      commit('STOP_LOADING')
      commit('SHUFFLE_ANSWER')
      commit('RESETQUIZ')
    }
  },
  modules: {
  }
})
