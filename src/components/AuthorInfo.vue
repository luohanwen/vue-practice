<template>
  <div class="authorInfo">
    <div class="author">hello {{$route.params.name}}</div>
    <router-link to="kebin">kebin</router-link>
    <div class="row">
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
      <div class="col-md-1">.col-md-1</div>
    </div>
    <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">点我弹出/隐藏弹出框</button>
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
    // console.log("ktv", KTVWeb);
    $('[data-toggle="popover"]').popover();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@c-red: green;
.author {
  color: @c-red;
  .px2px(font-size,12);
  display: flex;
}
</style>
