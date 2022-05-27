<template>
  <div>
    <div class="container">
      <h1 v-if="loading">Loading...</h1>
      <div v-if="Question.length">
        <!-- <h1><span>{{current + 1}} </span></h1> -->
        <h2>{{ Question[current].question | replace | apostroph }}</h2>
        <div class="options">
          <ul v-for="(options, index) in shuffledAnswers" :key="index">
            <li @click="selectedAnswer(index)" :class="checkAnswerClass(index)">{{ options }}</li>
          </ul>
        </div>
        <div class="nav">
          <button @click="submit" :disabled="selectedIndex == null || answered">Submit</button>
          <button @click="next" :disabled="answered == false">Next</button>
        </div>
        <div>
          <h1><span>{{current + 1}} - {{Question.length}}</span></h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['next', 'selectedAnswer', 'submit']),
    checkAnswerClass (index) {
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
        answerClass = 'selected'
      } else if (this.answered && this.correctIndex === index) {
        answerClass = 'correctanswer'
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
        answerClass = 'incorrectanswer'
      }
      return answerClass
    }
  },
  computed: {
    ...mapState(['loading', 'Question', 'current', 'selectedIndex', 'shuffledAnswers', 'correctIndex', 'answered', 'correctAnswers'])
  },
  filters: {
    replace: function (value) {
      return value.replace(/&quot;/g, '"')
    },
    apostroph: function (value) {
      return value.replace(/&#039;/g, "'")
    }
  },
  watch: {
    current: {
      handler () {
        this.$store.commit('RESET')
        this.$store.commit('SHUFFLE_ANSWER')
      }
    }
  }
}
</script>

<style >
body {
  background-color: #2e2e2e;
}

.container{
    display:flex;
    flex-direction: column;
    max-width:700px;
    margin: auto;
    box-shadow: 0px 7px 36px 0px rgba(0,0,0,0.35);
    -webkit-box-shadow: 0px 7px 36px 0px rgba(0,0,0,0.35);
    -moz-box-shadow: 0px 7px 36px 0px rgba(0,0,0,0.35);
    border-radius: 10px;
    margin-top: 50px;
    color: #fff;
}

.nav {
  display: flex;
  justify-content: flex-end;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul li {
  border: 1px solid #2E2E2E;
  margin-top: -1px; /* Prevent double borders */
  background-color: #2E2E2E;
  padding: 12px;
  color: #fff;
}
li:hover{
    background: #000;
    cursor:pointer;
}

h2 {
  font-weight: 100;
}

.selected{
    background: #676767 !important;
}
.correctanswer{
    background: springgreen;
}
.incorrectanswer{
    background: tomato;
}

button {
  margin-top: 30px;
  background-color: black;
  border: none;
  border-radius: 10px;
  padding: 6px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  font-size: 120%;
  cursor: pointer;
  margin: 10px;
}
</style>
