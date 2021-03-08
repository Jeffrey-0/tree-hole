<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <top-navbar></top-navbar>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavbar from '@/components/TopNavbar.vue'

export default {
  name: 'Home',
  components: {
    TopNavbar
  }
}
</script>
