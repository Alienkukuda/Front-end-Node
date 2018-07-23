<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{msgfromfather}}</h1>
    <button v-on:click="onClickMe">Click!</button>
    <button v-on:click="openMouse">open mouse!</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: ['msgfromfather'],
  // events: {
  //     'onAddnew': function (items) {
  //       console.log(items)
  //     }
  // },
  methods: {
    openMouse: function () {
      this.$emit('child-tell-me-something', this.msg) // dispatch变为emit也可以
    },
    onClickMe: function () {
      console.log(this.msgfromfather)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
