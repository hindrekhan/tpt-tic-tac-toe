<template>
  <div id="app">
    <div v-if="!code && !started">
      <button v-on:click="getCode">get code</button>
      <hr/>
      <input v-model="codeJoin" /> <button v-on:click="joinGame">use code</button>
    </div>
    <div v-if="code && !started">
      game field
    </div>
    <div v-if="started && code">
      <TicTacToe :code="code" :fields="fields" v-on:makeTurn="makeTurn" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import HelloWorld from './components/HelloWorld.vue';
import TicTacToe from './components/TicTacToe.vue';


export default {
  name: 'app',
  data() {
    return {
      started: false,
      fields: [],
      type: 'X',
      code: '',
      codeJoin: '',
    };
  },
  components: {
    HelloWorld,
    TicTacToe,
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      setTimeout(this.loadData, 500);
      if (!this.code) {
        return;
      }
      axios.get(`http://localhost:3000/api/status/${this.code}`)
          .then(({data}) => {
            this.fields = data.fields;
          });
    },
    makeTurn(cords) {
      const url = `http://localhost:3000/api/makeTurn/${this.code}/${cords[0]}/${cords[1]}/${this.type}/`;
      axios.get(url)
        .then(({data}) => {
          if (data.error) {
            alert(data.error);
            return;
          }
          this.fields = data.fields;
        });
    },
    joinGame() {
      axios.get(`http://localhost:3000/api/status/${this.codeJoin}`)
          .then(({data}) => {
            this.type = 'O';
            this.started = true;
            this.code = data.code;
            this.fields = data.fields;
          });
    },
    getCode() {
      axios.get('http://localhost:3000/api/start')
        .then(({data}) => {
          console.log('data', data);
          this.code = data.code;
          this.fields = data.fields;
          this.started = true;
        });
    },
  }
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
</style>
