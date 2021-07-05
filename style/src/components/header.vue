<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: ["title"]
};
</script>