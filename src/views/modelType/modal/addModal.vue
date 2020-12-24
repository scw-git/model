<template>
  <div class="modalManage-add-view">
    <a-modal
      :title="title"
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
          <a-form-model-item label="类型编码" prop="code" ref="code">
            <a-input
              placeholder="请输入类型编码(只能含有字母数字)"
              v-model="form.code"
              :disabled="form.id ? true : false"
              @blur="
                () => {
                  $refs.code.onFieldBlur();
                }
              "
            />
          </a-form-model-item>

          <a-form-model-item label="描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="是否开启">
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
            <a-button
              v-if="this.form.id"
              type="primary"
              @click="onUpdateByid"
              class="mr10"
            >
              更新
            </a-button>
            <a-button v-else type="primary" @click="onSubmit" class="mr10">
              提交
            </a-button>

            <a-button v-if="this.form.id" @click="onClose">
              取消
            </a-button>
            <a-button v-else @click="resetForm">
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
  data() {
    return {
      title: "",
      //抽屉显示与隐藏
      visible: false,
      //表单配置
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //表单提交字段
      form: {
        name: "",
        code: "",
        enabled: true,
        desc: ""
      },
      //表单校验规则
      rules: {
        name: [
          { required: true, message: "请输入模型名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "Length should be 1 to 100",
            trigger: "blur"
          }
        ],
        code: [
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
    //打开对话框
    handleOpen(data) {
      if (data) {
        this.form = { ...data };
        this.title = "修改";
        this.form.enabled = data.enabled === 1 ? true : false;
      } else {
        this.form = {};
        this.title = "新增";
      }
      this.visible = true;
    },
    //对话框关闭
    onClose() {
      this.resetForm();
      this.visible = false;
    },
    //表单提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            code: this.form.code,
            desc: this.form.desc,
            enabled: this.form.enabled ? 1 : 0,
            name: this.form.name
          };
          this.$http.addTypeData(params).then(res => {
            if (res.code === 1) {
              this.$message.success("添加成功");
              this.$parent.getDataList(); //父组件重新获取数据
              this.onClose();
            }
          });
        } else {
          return false;
        }
      });
    },
    //更新操作
    onUpdateByid() {
      let params = {
        id: this.form.id,
        desc: this.form.desc,
        name: this.form.name,
        enabled: this.form.enabled ? 1 : 0
      };
      this.$http.updateTypeById(params).then(res => {
        if (res.code === 1) {
          this.$message.success("更新成功");
          this.onClose(); //关闭弹窗
          this.$parent.getDataList(); //父组件重新获取数据
        }
      });
    },
    //表单重置
    resetForm() {
      this.form = {};
    }
  }
};
</script>
<style lang="scss"></style>
