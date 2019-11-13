<template>
  <div class="opusDetail">
    <div class="scratch-player">
      <iframe
        width="100%"
        height="100%"
        @load="handleIframeLoad"
        :src="
          `https://kaier001.com/create/player.html?workId=${$route.query.id}`
        "
        frameborder="0"
      >
      </iframe>
    </div>
    <div class="operation-btn">
      <div class="con" ref="up"  @touchend="triggerKeyboardEvent('Up',false)" @touchstart="triggerKeyboardEvent('Up',true)">上</div>
      <div class="con" ref="down">下</div>
      <div class="con" ref="let">左</div>
      <div class="con" ref="right">右</div>

    </div>
  </div>
</template>

<script>
// import { createKeyEvent, batchAddEvent } from 'eletokeyboard'
// import { fireKeyEvent } from '@/utils'
export default {
  data () {
    return {

    }
  },
  mounted () {
    // document.onkeydown = function (e) {
    //   console.log('e', e)
    // }
  },
  methods: {
    // up () {
    //   fireKeyEvent(this.$refs.up, 'keydown', 38)
    // },
    // 处理iframe加载完成事件
    handleIframeLoad () {
      this.iframeLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.scratch-player{
  width: 100%;
  height: 520px;
}
.operation-btn{
  .con{
    width: 100px;
    height: 40px;
    background-color: yellow;
    margin: 20px;
  }
}
</style>
