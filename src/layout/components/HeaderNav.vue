<template>
  <div class="header-nav">
    <div class="inn flex justify-between align-center is-border-box padding-lr-sm">
      <div class="inn-left flex flex-sub">
        <img class="logo" src="https://dev.steam001.com/scratch-community-logo.png" alt="" />
      </div>
      <div class="inn-right flex flex-sub">

      </div>
    </div>

  </div>
</template>

<script>
// import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'HeaderNav',
  components: {},
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.header-nav{
  position: fixed;
  top: 0;
  width:100%;
  height: 100px;
  background-color: pink;
  .inn{
    width: 100%;
    height: 100%;
    .inn-left{
      .logo{
        width: 355px;
        height: 72px;
      }
    }
  }

}
</style>
