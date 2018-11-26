<template>
  <div id="app">
    <div v-if="!code && !started">
      <button class="get-code" v-on:click="getCode">get code</button>
      <hr/>
      <input class="i-get-code" v-model="codeJoin" /> <button class="join-code" v-on:click="joinGame">use code</button>
    </div>
    <div v-if="code && !started">
      game field
    </div>
    <div v-if="started && code">
      <TicTacToe :code="code" :fields="fields" :tie="tie" :victory="victory" v-on:makeTurn="makeTurn" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import HelloWorld from './components/HelloWorld.vue';
import TicTacToe from './components/TicTacToe.vue';

let apiUrl = 'http://localhost:3000/api';

try {
  const tmpApiUrl = process.env.VUE_APP_APIURL;
  console.log('tmpApiUrl', tmpApiUrl);
  if (tmpApiUrl) {
    apiUrl = tmpApiUrl;
  }
} catch (e) {}

console.log('apiUrl', apiUrl);

export default {
  name: 'app',
  data() {
    return {
      started: false,
      fields: [],
      type: 'X',
      code: '',
      codeJoin: '',
      tie: false,
      victory: '',
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
      axios.get(`${apiUrl}/status/${this.code}`)
          .then(({data}) => {
            console.log('data', data);
            this.fields = data.fields;
            this.tie = data.tie;
            this.victory = data.victory;
          });
    },
    makeTurn(cords) {
      const url = `${apiUrl}/makeTurn/${this.code}/${cords[0]}/${cords[1]}/${this.type}/`;
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
      axios.get(`${apiUrl}/status/${this.codeJoin}`)
          .then(({data}) => {
            this.type = 'O';
            this.started = true;
            this.code = data.code;
            this.fields = data.fields;
          });
    },
    getCode() {
      axios.get(`${apiUrl}/start`)
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
