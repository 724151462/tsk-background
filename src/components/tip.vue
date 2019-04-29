<template>
  <div class="tip"><p>{{ title }}</p></div>
</template>

<script>
  export default {
    name: "tip",
    props:['title']
  }
</script>

<style scoped>
  .tip{
    padding: 0 16px;
    background-color: #ecf8ff;
    border-left: 5px solid #50bfff;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-left: 0;
  }
  .tip p {
    padding: 10px 0;
    font-size: 15px;
    color: #5e6d82;
  }
</style>