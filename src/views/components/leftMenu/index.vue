<template>
  <div class="left-menu-list">
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="selKey"
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

      <a-sub-menu key="/modType">
        <span slot="title"
          ><a-icon type="appstore" /><span>模型管理</span></span
        >
        <a-menu-item key="/modType">
          <a-icon type="calendar" /> 模型分类
        </a-menu-item>
        <a-menu-item key="/modList">
          <a-icon type="calendar" />
          模型列表
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selKey: ["/comAnalysis"]
    };
  },
  methods: {
    handleClick({ key }) {
      this.selKey = [key];
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
