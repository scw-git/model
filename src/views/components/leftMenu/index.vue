<template>
  <div class="left-menu-list">
    <a-menu
      mode="vertical"
      theme="dark"
      :default-selected-keys="['/comAnalysis']"
      @click="handleClick"
    >
      <a-menu-item key="/comAnalysis">
        <a-icon type="calendar" />
        组成分析
      </a-menu-item>
      <a-menu-item key="/factorAnalysis">
        <a-icon type="calendar" />
        因子分析
      </a-menu-item>
      <a-menu-item key="/entropyMethod">
        <a-icon type="calendar" />
        熵值法
      </a-menu-item>
      <a-menu-item key="/levelAnalysis">
        <a-icon type="calendar" />
        层次分析
      </a-menu-item>
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
    return {};
  },
  methods: {
    handleClick({ key }) {
      /*eslint no-console:0 */
      // console.log("key", key);
      this.$router.push({
        path: key
      });
    }
  }
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
</style>
