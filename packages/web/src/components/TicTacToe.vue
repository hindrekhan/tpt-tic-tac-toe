<template>
    <div>
        <div class="code">code: <strong>{{ code }}</strong></div>

        <div v-if="victory" class="victory">{{ victory }} won!!!</div>
        <div v-else-if="tie" class="tie">GAME IS IN TIE</div>
 
        <table border="1">
            <tr>
                <td v-on:click="fieldClick(0, 0)">{{ fields[0][0] || '-' }}</td>
                <td v-on:click="fieldClick(0, 1)">{{ fields[0][1] || '-' }}</td>
                <td v-on:click="fieldClick(0, 2)">{{ fields[0][2] || '-' }}</td>
            </tr>
            <tr>
                <td v-on:click="fieldClick(1, 0)">{{ fields[1][0] || '-' }}</td>
                <td v-on:click="fieldClick(1, 1)">{{ fields[1][1] || '-' }}</td>
                <td v-on:click="fieldClick(1, 2)">{{ fields[1][2] || '-' }}</td>
            </tr>
            <tr>
                <td v-on:click="fieldClick(2, 0)">{{ fields[2][0] || '-' }}</td>
                <td v-on:click="fieldClick(2, 1)">{{ fields[2][1] || '-' }}</td>
                <td v-on:click="fieldClick(2, 2)">{{ fields[2][2] || '-' }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  props: {
    code: String,
    victory: String,
    tie: Boolean,
    fields: Array
  },
  methods: {
      fieldClick(x, y) {
        this.$emit('makeTurn', [x, y]);
      },
  },
}
</script>


<style lang="scss">
  .code {
    padding-bottom: 15px;
    padding-bottom: 20px;
    font-size: 24px;
  }
  .tie {
    font-size: 20px;
    color: blue;
    padding: 10px;
  }
  .victory {
    font-size: 50px;
    color: green($color: #000000);
    padding: 20px;
  }
  table {
    border-collapse: collapse;
    font-size: 24px;
    margin: auto;

    td {
      height: 40px;
      width: 40px;
    }
  }
</style>
