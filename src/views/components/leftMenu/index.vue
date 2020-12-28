<template>
  <div class="left-menu-list">
    <a-menu mode="inline" theme="dark" :selectedKeys="selKey" @click="handleClick">
      <a-menu-item key="/dimension">
        <a-icon type="calendar" />
        指标项
      </a-menu-item>
      <a-menu-item key="/indicatorsList">
        <a-icon type="calendar" />
        指标列表
      </a-menu-item>
      <a-sub-menu key="/modType">
        <span slot="title"><a-icon type="appstore" /><span>模型管理</span></span>
        <a-menu-item key="/modType"> <a-icon type="calendar" /> 模型分类 </a-menu-item>
        <a-menu-item key="/modList">
          <a-icon type="calendar" />
          模型列表
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="/taskList">
        <a-icon type="calendar" />
        任务列表
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selKey: ["/dimension"],
    };
  },
  watch: {
    $route(to) {
      /*eslint no-console:[0]*/
      if (to.path) {
        this.selKey[0] = to.path;
      }
    },
  },
  created() {
    this.getRouter();
  },
  methods: {
    getRouter() {
      let router_path = this.$route.path;
      console.log("this.$route.path", this.$route.path);
      if (router_path) {
        this.selKey[0] = router_path;
      }
    },
    handleClick({ item, key, keyPath }) {
      // console.log("item", item);
      // console.log("key", key);
      // console.log("keypath", keyPath);
      this.selKey = [key];
      this.$router.push({
        path: key,
      });
    },
  },
};
</script>
<style lang="scss">
.left-menu-list {
  .ant-menu {
    background: #1b5b8c;
    .ant-menu-item:hover {
      background: #226fa9;
    }
    .ant-menu-item-selected:hover {
      background: #1890ff;
    }
  }
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #1b5b8c;
}
</style>
