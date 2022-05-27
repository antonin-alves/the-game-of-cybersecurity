<template>
  <div>
    <header>
      <div>
        <button @click="$store.commit('RESETQUIZ')">Anime Quiz</button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header'
}
</script>

<style scoped>

button {
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 300%;
  cursor: pointer;
}

header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.correct{
  font-size: 2rem;
  font-weight: 600;
}
</style>
