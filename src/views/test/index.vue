<template>
  <div class="">
    <div class="item"></div>
        <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <router-link to="/testDetail">
        <div class="item"></div>

    </router-link>

  </div>
</template>

<script>
export default {
  created () {
    console.log('creatd')
  }
}
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  height: 900px;
  margin: 100px 0;
  background-color: red;
}
</style>
