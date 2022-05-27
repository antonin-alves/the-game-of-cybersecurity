<template>
  <div>
    <div>
      <form>
        <!-- <label for="difficulty">select difficulty:</label>
        <select v-model="difficulty" name="difficulty" id="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <br /><br /> -->
        <button @click.prevent="startQuiz()">Start Quiz</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      difficulty: ''
    }
  },
  methods: {
    startQuiz () {
      this.$store.dispatch('beginQuiz', this.difficulty)
    }
  }
}
</script>

<style scoped>

button {
  margin-top: 30px;
  background-color: black;
  border: none;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  color: #fff;
  font-size: 120%;
  cursor: pointer;
}

</style>
