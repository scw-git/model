<template>
  <div>
    <a-modal
      title="查看详情"
      :footer="null"
      @cancel="handleClose"
      v-model="visible"
      width="50%"
    >
      <a-row class="innerList" style="border-top: 1px solid lightgray;">
        <a-col :span="8" class="textRig color999">维度名称：</a-col>
        <a-col :span="16" class="color333">{{ orderData.target_name }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">指标算法：</a-col>
        <a-col :span="16" class="color333">{{ orderData.formula }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">创建时间：</a-col>
        <a-col :span="16" class="color333">{{ orderData.crtime }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">修改时间：</a-col>
        <a-col :span="16" class="color333">{{ orderData.utime }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">加分项或减分项：</a-col>
        <a-col :span="16" class="color333">{{ orderData.type }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">状态：</a-col>
        <a-col :span="16" class="color333">{{ orderData.status }}</a-col>
      </a-row>
      <a-row class="innerList">
        <a-col :span="8" class="textRig color999">备注：</a-col>
        <a-col :span="16" class="color333">{{ orderData.desc }}</a-col>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      orderData: {
        title: "",
        description: "",
        email: "",
        username: "",
        contractCode: "",
        phone: ""
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 17 }
      }
    };
  },
  watch: {},
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleOpen(data) {
      this.orderData = { ...data };
      this.visible = true;
    }
  }
};
</script>
<style scoped lang="scss">
.login-form {
  button {
    width: 100%;
  }
  .login-title {
    font-size: 18px;
  }
}
.tipFont {
  font-size: 14px;
}
</style>
<style lang="scss">
.innerList {
  line-height: 37px;
  border: 1px solid lightgray;
  border-top: none;
  border-radius: 2px;
}
</style>
