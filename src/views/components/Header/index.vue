<template>
  <div class="header-wrap">
    <div class="header-left f-left">
      <h2 class="header-logo-text">模型管理平台</h2>
    </div>
    <div class="header-right f-right">
      <div class="user-con item">
        <img src="~@/assets/img/admin.png" alt="" />
        <span class="username">admin</span>
      </div>
      <div class="logout-con item">
        <a-icon type="poweroff" />
        <span class="logout">退出</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.header-wrap {
  height: 80px;
  padding: 0 30px;
  width: 100%;
  overflow: hidden;
  background: url("~@/assets/img/header_bg.jpg") no-repeat left top;
  .header-left {
    .header-logo-text {
      line-height: 80px;
      font-size: 22px;
      font-weight: bold;
      color: #1b5b8c;
    }
  }
  .header-right .item {
    display: inline-block;
    line-height: 80px;
    margin-left: 20px;
    cursor: pointer;
    color: #1b5b8c;
    font-size: 16px;
    font-weight: bold;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 7px;
    }
  }
}
</style>
