<template>
  <div class="index">
    <div class="swip-wrapper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="page-moudle is-border-box padding-lr-sm">
      <div class="page-moudle-title flex align-center justify-between">
        <span class="l">精选作品</span>
        <span class="r">更多</span>
      </div>
      <div class="page-moudle-list">
        <div class="moudle-item" v-for="(work) in workList" :key="work.id">
          <workItem :info="work"/>
        </div>
      </div>
    </div>
    <!-- <p id="anchor2" style="height:500px">Anchor2</p> -->
  </div>
</template>

<script>
import workItem from './components/workItem'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      images: [
        '//edu-image.nosdn.127.net/4d4cbe60bba141e2a10da83570526da0.png',
        '//edu-image.nosdn.127.net/97a87202224b4e119b7ca0d4f8d1b359.png',
        '//edu-image.nosdn.127.net/089d7386f96b4dff9326aa6ed14613a8.jpg'
      ]
    }
  },
  created () {
    this.getWorkList()
  },
  computed: {
    ...mapState('work', {
      workList: 'workList'
    })
  },
  methods: {
    ...mapActions({
      getWorkList: 'work/getWorkList'
    })
  },
  components: {
    workItem
  }
}
</script>

<style lang="scss" scoped>
.index{
  .swip-wrapper{
    width: 100%;
    height: 290px;
    img{
      width: 100%;
      height: 290px;
    }
  }
  .page-moudle{
    .page-moudle-title{
      font-size: 34px;
      height: 90px;
    }
    .page-moudle-list{
      .moudle-item{
        float: left;
        margin-bottom: 10px;
        &:nth-child(2n){
          margin-left: 40px;
        }
      }
    }
  }
}
</style>
