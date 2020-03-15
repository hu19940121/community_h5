<template>
  <div class="work">
    <router-link :to="'/opusDetail?id=' + info.id">
      <div class="work-banner">
        <img :src="info.poster" alt="">
      </div>
    </router-link>
    <div class="work-info">
      <p class="name ellipsis padding-tb-xs">{{ info.name }}</p>
      <p class="author ellipsis">{{ info.author && info.author.nickName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.work{
  width: 330px;
  .work-banner{
    width: 100%;
    height: 240px;
    img{ width: 100%;height: 100%; }
  }
  .work-info{
    p{ width: 330px; }
    .name{
      font-size: 30px;
    }
    .author{
      color: #B0BEC5;
      font: 26px;
    }
  }
}
</style>
