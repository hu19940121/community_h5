<template>
  <div class="app-wrapper" >
    <div class="main-container">
      <header-nav />
      <app-main />
    </div>
  </div>
</template>

<script>
import { HeaderNav, AppMain } from './components'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  components: { HeaderNav, AppMain },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
