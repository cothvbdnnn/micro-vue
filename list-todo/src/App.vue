<template>
  <div id="app">
    <router-link to="/list/test"> test </router-link>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  beforeMount() {},
};
</script>

<style>
#app {
  width: var(--global-width);
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
