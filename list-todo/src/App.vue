<template>
  <div id="app">
    <List />
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
