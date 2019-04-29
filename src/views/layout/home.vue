<template>
  <el-row class="container">
    <router-view></router-view>
  </el-row>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      loading: false
    };
  }
};
</script>
