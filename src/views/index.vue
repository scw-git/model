<template>
  <div class="main-body-wrap">
    <div class="left-main-body">
      <div class="left-top">
        <img src="~@/assets/img/user_photo.png" alt="" />
      </div>
      <div class="left-menu-con">
        <leftMenu />
      </div>
    </div>
    <div class="mian-body-content">
      <Header />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/views/components/Header";
import leftMenu from "@/views/components/leftMenu";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    leftMenu
  },
  watch: {},
  methods: {}
};
</script>
<style scoped lang="scss">
.main-body-wrap {
  position: relative;
  .left-main-body {
    width: 220px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #1b5b8c;
    .left-top {
      text-align: center;
      padding: 30px 0;
    }
  }
  .mian-body-content {
    width: 100%;
    padding-left: 220px;
    .main-content {
      background: #fff;
      min-height: calc(100vh - 80px);
    }
  }
}
</style>
