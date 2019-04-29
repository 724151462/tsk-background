<template>
  <ol class="breadcrumb">
    <template v-for="list in pathList">
      <li :key="list.id">
        <router-link :to="list.path">
          {{list.name}}
        </router-link>
      </li>
    </template>
    <li class="active">{{nowName}}</li>
  </ol>
</template>

<script>
export default {
  name: "breadcrumb",
  props: ["pathList", "nowName"]
};
</script>

<style scoped>
.breadcrumb {
  padding: 8px 15px;
  margin-bottom: 20px;
  list-style: none;
  /*background-color: #f5f5f5;*/
  border-radius: 4px;
}
.breadcrumb > li {
  display: inline-block;
}
a {
  color: #337ab7;
  text-decoration: none;
}
.breadcrumb > .active {
  color: #777;
}
.breadcrumb > li + li:before {
  padding: 0 5px;
  color: #ccc;
  content: "/\00a0";
}
</style>