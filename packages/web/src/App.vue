<template>
  <div id="app">
    <div id="game1">
      <game/>
    </div>

    <div id="game2">
      <game/>
    </div>
  </div>
</template>

<script>
import Game from './Game.vue';

export default {
  components: {
    Game,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#game1, #game2 {
  margin: auto;
  margin-top: 35px;
  padding: 10px;
  width: 350px;
}

#game1 {
  background-color: greenyellow;
}

#game2 {
  background-color: lightblue;
}
</style>
