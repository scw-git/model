<template>
  <div>
    <a-modal
      :title="title"
      :footer="null"
      @cancel="handleClose"
      v-model="visible"
      width="60%"
    >
      <a-form-model
        ref="ruleForm"
        style="padding:20px;"
        :model="ruleForm"
        :rules="rules"
        v-bind="layout"
      >
        <a-form-model-item prop="groupName" label="组名" required>
          <a-input v-model="ruleForm.groupName" disabled />
        </a-form-model-item>
        <a-form-model-item prop="jobName" label="任务名" required>
          <a-input
            placeholder="请输入任务名"
            v-model="ruleForm.jobName"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item prop="modelName" label="模型类名" required>
          <a-input
            placeholder="请输入模型类名"
            v-model="ruleForm.modelName"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item prop="corn" label="时间设置" required>
          <a-input
            placeholder="请输入时间设置值"
            v-model="ruleForm.corn"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item prop="params" label="参数设置" required>
          <a-input
            placeholder="请输入参数设置"
            v-model="ruleForm.params"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item prop="isEnable" label="是否启用" required>
          <a-radio-group v-model="ruleForm.isEnable">
            <a-radio value="1">
              是
            </a-radio>
            <a-radio value="0">
              否
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 16, offset: 4 }">
          <a-button type="primary" @click="submitForm('ruleForm')" class="mr10">
            提交
          </a-button>
          <a-button @click="handleClose">
            取消
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      updatePhoneStatus: false,
      visible: false,
      ruleForm: {
        groupName: "",
        jobName: "",
        modelName: "",
        corn: "",
        params: "",
        isEnable: ""
      },
      rules: {},
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 }
      }
    };
  },
  watch: {},
  created() {},
  methods: {
    getVerCode() {
      if (this.ruleForm.phone) {
        let params = {
          emulateJSON: true,
          phone: this.ruleForm.phone
        };
        this.$http.validCodeSms(params).then(res => {
          if (res.status == 200) {
            this.$message.success(res.msg);
          }
        });
      } else {
        this.$message.error("请输入手机号");
      }
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen(info) {
      this.ruleForm = { ...info };
      this.title = info ? "修改任务" : "新增任务";
      this.ruleForm.groupName = "comlistallCount";
      this.visible = true;
      this.updatePhoneStatus = false;
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            emulateJSON: true,
            ...this.ruleForm
          };
          this.$http.startJob(params).then(res => {
            /*eslint no-console:[0]*/
            console.log(888, res);
            // if (res.code == 1) {
            //   this.$message.success(res.msg);
            //   this.$emit("getDataList");
            //   this.handleClose();
            // }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss"></style>
<style lang="scss">
.ant-form-item-control {
  line-height: 32px !important;
}
</style>
