<template>
  <div class="authorInfo">
    <div class="author">hello {{$route.params.name}}</div>
    <router-link to="kebin">kebin</router-link>
  </div>
</template>

<script>
export default {
  name: "AuthorInfo",
  data() {
    return {
      author: {
        name: "haven"
      }
    };
  },
  mounted() {
    console.log("authorinfo begin");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@c-red: green;
.author {
  color: @c-red;
  .px2px(font-size,12);
}
</style>
