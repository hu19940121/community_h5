<template>
  <div class="app-main">
    <!-- <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>
    </transition> -->
    <!-- <transition :name="transitionName"> -->
      <keep-alive :include="cachedViews">
        <router-view class="router"></router-view>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
import defaultSetting from '@/settings'

export default {
  name: 'AppMain',
  components: { },
  watch: {
    $route (val) {
      // addCachedView
      // console.log('val', val)
      // console.log(' this.$store.state.direction', this.$store.state.direction)
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.app.cachedViews
    },
    transitionName () {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 100px);
  width: 100%;
  padding-top: 100px;
  overflow: hidden;
  /* margin: 0 auto;
  overflow: hidden; */
  .router {
    width: 100%;
    /* height: 100%; */
    height: calc(100vh - 100px);
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    top: 100px;
    right: 0;
    bottom: 0;
    left: 0;
    // background-color: #fff;
  }
}
/* .fixed-header + .app-main {
  padding-top: 50px;
} */

</style>
