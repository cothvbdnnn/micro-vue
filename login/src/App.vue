<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Login
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
