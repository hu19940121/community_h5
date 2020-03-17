<template>
  <div :class="['opusDetail',{ bb: isStart}]">
    <div class="scratch-player">
      <iframe class="canvas" @load="handleIframeLoad" ref="iframe" src="/scratchPlayer/player.html" frameborder="0"></iframe>
      <!--操作栏 -->
      <div class="opeBar flex justify-center align-center">
        <div class="flex">
          <img @click="start" class="c-cion" src="./images/start.svg" alt="">
          <img @click="stop" class="c-cion margin-left" src="./images/stop.svg" alt="">
        </div>
      </div>
    </div>
    <div class="operation-block" v-show="isStart">
      <div class="con w">w</div>
      <div class="con s">s</div>
      <div class="con a">a</div>
      <div class="con d">d</div>
      <div class="con Space">空格</div>
      <div class="con ArrowUp">上</div>
      <div class="con ArrowDown">下</div>
      <div class="con ArrowLeft">左</div>
      <div class="con ArrowRight">右</div>

    </div>
    <div class="opus-content" v-if="!isStart">

    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getCompositionInfoById } from '@/api/work'
const keyCodeMap = {
  'w': 87,
  'a': 65,
  's': 83,
  'd': 68,
  'ArrowUp': 38,
  'ArrowDown': 40,
  'ArrowLeft': 37,
  'ArrowRight': 39,
  ' ': 32
}
export default {
  data () {
    return {
      iframeWindow: {},
      isStart: false,
      startFlag: 'https://edu-image.nosdn.127.net/a06f29b4-b5f2-4105-bb5f-bc284ea3bc35.svg',
      stopFlag: 'https://edu-image.nosdn.127.net/a06f29b4-b5f2-4105-bb5f-bc284ea3bc35.svg',
      iframeLoaded: false,
      detail: {},
      author: {},
      planetProgramObjectStatistic: {}
    }
  },
  mounted () {
    // dom绑定事件
    this.bindEvents()
  },

  methods: {
    ...mapMutations({
      setHeaderNavVisible: 'app/setHeaderNavVisible'
    }),
    triggerKeyboardEvent (key, isDown) {
      this.iframeWindow.vm.postIOData('keyboard', {
        keyCode: keyCodeMap[key],
        key: key,
        isDown
      })
    },
    bindEvents () {
      for (const key in keyCodeMap) {
        if (key === ' ') {
          this.regKeyEvent(`.Space`, ' ', keyCodeMap[key])
        } else {
          this.regKeyEvent(`.${key}`, key, keyCodeMap[key])
        }
      }
    },
    regKeyEvent (selector, key, keyCode) {
      let that = this
      document.querySelector(selector).addEventListener('touchstart', function (event) {
        that.iframeWindow.vm.postIOData('keyboard', {
          keyCode: keyCode,
          key: key,
          isDown: true
        })
        event.preventDefault()
      })
      document.querySelector(selector).addEventListener('touchend', function (event) {
        that.iframeWindow.vm.postIOData('keyboard', {
          keyCode: keyCode,
          key: key,
          isDown: false
        })
        event.preventDefault()
      })
    },
    // 当iframe加载完
    handleIframeLoad () {
      this.iframeWindow = this.$refs.iframe.contentWindow
      this.iframeWindow.scratch.setPlayerOnly(true)
      this.iframeWindow.scratch.setFullScreen(true)
      this.iframeWindow.vm.start()
      this.handleGetCompositionInfoById()
    },
    // 获取作品信息
    handleGetCompositionInfoById () {
      getCompositionInfoById({ id: this.$route.query.id }).then(res => {
        this.detail = res.data
        this.detail.currentUserScore = res.data.currentUserScore || 0
        this.planetProgramObjectStatistic =
          res.data.planetProgramObjectStatistic
        this.author = res.data.author
        this.iframeWindow.scratch.loadProject(res.data.url, () => {
          console.log('项目加载完毕')
        })
      })
    },
    start () {
      // this.setHeaderNavVisible(false)
      this.isStart = true
      this.iframeWindow.vm.greenFlag() // 执行程序
    },
    stop () {
      this.isStart = false
      // this.setHeaderNavVisible(true)
      this.iframeWindow.vm.stopAll()
    }
  }
}
</script>

<style lang="scss" scoped>
.opusDetail{
  &.bb{
    background: #323238;
  }
  .scratch-player{
    width: 100%;
    .canvas{
      width: 100%;
      height: 500px;
    }
    .opeBar{
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #ccc;
      background: #fff;
      .c-cion{
        width: 38px;
      }
    }
  }
  .operation-block{
    width: 100%;
    .con{
      width: 100px;
      height: 40px;
      background-color: yellow;
      margin: 20px;
    }
  }
  .opus-content{
    width: 100%;
    height: 2000px;
    background-color: yellow;
  }
}

</style>
