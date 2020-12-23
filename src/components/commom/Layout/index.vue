<template>
  <div class="homeIndex_body">
    <headerPage />
    <div class="centent">
      <router-view />
    </div>
    <footerCom />
  </div>
</template>
<script>
import footerCom from "@/views/homeIndex/home/footer.vue";
import headerPage from "@/views/homeIndex/home/header";
export default {
  data() {
    return {};
  },
  components: {
    headerPage,
    footerCom
  },
  watch: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.centent {
  overflow: hidden;
  min-height: 708px;
}
</style>
