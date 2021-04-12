<template>
  <div class="container" id="admin">
    <nav-header></nav-header>
    <nav-right></nav-right>
    <tag></tag>
  </div>
</template>
<script>
import NavHeader from "@/components/admin/NavHeader.vue";
import NavRight from "@/components/admin/NavRight.vue";
import Tag from "@/components/admin/Tag.vue";
export default {
  components: {
    NavHeader,
    Tag,
    NavRight,
  },
};
</script>
<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
</style>
