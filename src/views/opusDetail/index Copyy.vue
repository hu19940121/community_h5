<template>
  <div :class="['opusDetail',{ bb: isStart}]">
    <div class="scratch-player">
      <canvas
        class="canvas"
        id="stage"
      >
      </canvas>
      <!--操作栏 -->
      <div class="opeBar flex justify-center align-center">
        <div class="flex">
          <img @click="start" class="c-cion" src="./images/start.svg" alt="">
          <img @click="stop" class="c-cion margin-left" src="./images/stop.svg" alt="">
        </div>
      </div>
    </div>
    <div class="operation-block" v-if="isStart">
      <div class="con" ref="up"  @touchend="triggerKeyboardEvent('w',false)" @touchstart="triggerKeyboardEvent('w',true)">w</div>
      <div class="con" ref="down" @touchend="triggerKeyboardEvent('s',false)" @touchstart="triggerKeyboardEvent('s',true)">s</div>
      <div class="con" ref="let" @touchend="triggerKeyboardEvent('a',false)" @touchstart="triggerKeyboardEvent('a',true)">a</div>
      <div class="con" ref="right" @touchend="triggerKeyboardEvent('d',false)" @touchstart="triggerKeyboardEvent('d',true)">d</div>
      <div class="con" ref="Space" @touchend="triggerKeyboardEvent(' ',false)" @touchstart="triggerKeyboardEvent(' ',true)">空格</div>
      <div class="con" ref="ArrowUp" @touchend="triggerKeyboardEvent('ArrowUp',false)" @touchstart="triggerKeyboardEvent('ArrowUp',true)">上</div>
      <div class="con" ref="ArrowDown" @touchend="triggerKeyboardEvent('ArrowDown',false)" @touchstart="triggerKeyboardEvent('ArrowDown',true)">下</div>
      <div class="con" ref="ArrowLeft" @touchend="triggerKeyboardEvent('ArrowLeft',false)" @touchstart="triggerKeyboardEvent('ArrowLeft',true)">左</div>
      <div class="con" ref="ArrowRight" @touchend="triggerKeyboardEvent('ArrowRight',false)" @touchstart="triggerKeyboardEvent('ArrowRight',true)">右</div>

    </div>
    <div class="opus-content" v-if="!isStart">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AudioEngine from 'scratch-audio'
import ScratchStorage from 'scratch-storage'
import ScratchRender from 'scratch-render'
import ScratchSVGRenderer from 'scratch-svg-renderer'
import VirtualMachine from 'scratch-vm'
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
    // this.init()
    this.handleGetCompositionInfoById()
  },

  methods: {
    ...mapMutations({
      setHeaderNavVisible: 'app/setHeaderNavVisible'
    }),
    handleGetCompositionInfoById () {
      getCompositionInfoById({ id: this.$route.query.id }).then(res => {
        this.detail = res.data
        this.detail.currentUserScore = res.data.currentUserScore || 0
        this.planetProgramObjectStatistic =
          res.data.planetProgramObjectStatistic
        this.author = res.data.author
        this.init(res.data.url)
      })
    },
    triggerKeyboardEvent (key, isDown) {
      this.vm.postIOData('keyboard', {
        keyCode: keyCodeMap[key],
        key: key,
        isDown
      })
    },
    init (url = 'https://resource.kaier001.com/Flappy Bird2019/11/11-下午6:58:17.sb3') {
      window.devicePixelRatio = 1
      let canvas = document.getElementById('stage')
      const audioEngine = new AudioEngine()
      var render = new ScratchRender(canvas)
      var vm = new VirtualMachine()
      var storage = new ScratchStorage()

      vm.attachAudioEngine(audioEngine)
      vm.attachStorage(storage)
      vm.attachRenderer(render)
      vm.attachV2SVGAdapter(new ScratchSVGRenderer.SVGRenderer())
      vm.attachV2BitmapAdapter(new ScratchSVGRenderer.BitmapAdapter())
      this.vm = vm
      // Feed mouse events as VM I/O events.
      document.body.addEventListener('touchmove', e => {
        const rect = canvas.getBoundingClientRect()
        const coordinates = {
          // x: e.clientX - rect.left,
          // y: e.clientY - rect.top,
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
        }
        vm.postIOData('mouse', coordinates)
      })
      canvas.addEventListener('touchstart', e => {
        const rect = canvas.getBoundingClientRect()
        const data = {
          isDown: true,
          // x: e.clientX - rect.left,
          // y: e.clientY - rect.top,
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
        }
        this.vm.postIOData('mouse', data)
        e.preventDefault()
      })
      canvas.addEventListener('touchend', e => {
        const rect = canvas.getBoundingClientRect()
        const data = {
          isDown: false,
          // x: e.clientX - rect.left,
          // y: e.clientY - rect.top,
          x: e.changedTouches[0].clientX - rect.left,
          y: e.changedTouches[0].clientY - rect.top,
          canvasWidth: rect.width,
          canvasHeight: rect.height
        }
        this.vm.postIOData('mouse', data)
        e.preventDefault()
      })
      // Feed keyboard events as VM I/O events.
      document.body.addEventListener('keydown', e => {
        // Don't capture keys intended for Blockly inputs.
        if (e.target !== document && e.target !== document.body) {
          return
        }
        this.vm.postIOData('keyboard', {
          keyCode: e.keyCode,
          key: e.key,
          isDown: true
        })
        e.preventDefault()
      })
      document.body.addEventListener('keyup', e => {
        // Always capture up events,
        // even those that have switched to other targets.
        this.vm.postIOData('keyboard', {
          keyCode: e.keyCode,
          key: e.key,
          isDown: false
        })
        // E.g., prevent scroll.
        if (e.target !== document && e.target !== document.body) {
          e.preventDefault()
        }
      })

      // Run threads
      vm.start()
      this.spinShow = true
      axios
        .get(url, {
          responseType: 'blob'
        })
        .then(res => {
          this.spinShow = false
          var reader = new FileReader()
          reader.readAsArrayBuffer(res.data)
          reader.onload = () => {
            vm.loadProject(reader.result).then(() => {
              // this.spinShow = false
            })
          }
        })
    },
    start () {
      console.log('start')
      // this.setHeaderNavVisible(false)
      this.isStart = true
      this.vm.greenFlag() // 执行程序
    },
    stop () {
      console.log('stop')
      this.isStart = false
      // this.setHeaderNavVisible(true)
      this.vm.stopAll()
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
