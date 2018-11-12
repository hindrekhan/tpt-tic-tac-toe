<template> 
    <div>
        code: {{ code }}
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
    fields: Array
  },
  methods: {
      fieldClick(x, y) {
        this.$emit('makeTurn', [x, y]);
      },
  },
}
</script>
