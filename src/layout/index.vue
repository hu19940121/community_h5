<template>
  <div class="app-wrapper" >
    <div class="main-container">
      <header-nav  v-if="headerNavVisible"/>
      <app-main />
    </div>
  </div>
</template>

<script>
import { HeaderNav, AppMain } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  components: { HeaderNav, AppMain },
  computed: {
    ...mapState('app', {
      headerNavVisible: 'headerNavVisible'
    })
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.main-container{
  overflow: hidden;
}
</style>
