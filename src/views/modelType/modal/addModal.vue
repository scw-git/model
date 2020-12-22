<template>
  <div class="modalManage-add-view">
    <a-modal
      title="新增页面"
      width="50%"
      :visible="visible"
      @cancel="onClose"
      :footer="null"
    >
      <!-- 表单区域 -->
      <a-row>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="名称" prop="name">
            <a-input
              placeholder="请输入分类名称"
              v-model="form.name"
              @blur="
                () => {
                  $refs.name.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="类型编码" prop="type" ref="type">
            <a-input
              placeholder="请输入类型编码(只能含有字母数字)"
              v-model="form.type"
              :disabled="obj.enabled == 1 || obj.enabled == 0"
              @blur="
                () => {
                  $refs.type.onFieldBlur();
                }
              "
            />
          </a-form-model-item>

          <a-form-model-item label="描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="是否开启" prop="enabled">
            <a-switch
              checked-children="已开启"
              un-checked-children="已关闭"
              default-checked
              v-model="form.enabled"
            />
          </a-form-model-item>
          <!-- 提交重置区域 -->
          <a-form-model-item
            style="text-align:center"
            :wrapper-col="{ span: 24 }"
          >
            <a-button type="primary" @click="onSubmit">
              提交
            </a-button>
            <a-button @click="resetForm">
              重置
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-row>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: ["obj"],
  data() {
    return {
      //抽屉显示与隐藏
      visible: false,
      //表单配置
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //表单提交字段
      form: {
        name: "",
        type: "",
        enabled: true,
        desc: ""
      },
      //表单校验规则
      rules: {
        name: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入类型编码(只能含有字母数字)",
            pattern: /^[0-9a-zA-Z]+$/,
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请输入描述内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    //关闭对话框
    handleClose() {
      this.visible = false;
    },
    //打开对话框
    handleOpen() {
      this.visible = true;
    },
    //对话框关闭
    onClose() {
      this.visible = false;
    },
    //表单提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            code: this.form.type,
            desc: this.form.desc,
            enabled: this.form.enabled ? 1 : 0,
            name: this.form.name
          };
          this.$http.addTypeData(params).then(
            res => {
              if (res.code === 1) {
                this.$message.success("添加成功");
                this.resetForm();
              }
            },
            err => {
              return this.$message.error("添加失败");
            }
          );
        } else {
          return false;
        }
      });
    },
    //表单重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  watch: {
    //获取到信息，表示是修改
    obj() {
      let editObj = this.obj;
      this.form.name = editObj.name;
      this.form.type = editObj.code;
      this.form.desc = editObj.desc;
      this.form.enable = editObj.enable === 1 ? true : false;
    }
  }
};
</script>
<style lang="scss">
.modalManage-add-view {
}
</style>
