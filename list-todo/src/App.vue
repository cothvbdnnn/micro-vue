<template>
  <div id="app">
    <h1>List</h1>
    <List msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import List from './components/List'

export default {
  name: 'App',
  components: {
    List
  }
}
</script>

<style>
#app {
  width: var(--global-width);
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
