<template>
  <div class="modal-add-view">
    <a-drawer title="新增页面" width="50%" :visible="visible" @close="onClose">
      <!-- 第一层抽屉内容 -->
      <!-- 表单区域 -->
      <a-row>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="modelName" label="名称" prop="modelName">
            <a-input
              placeholder="请输入模型名称"
              v-model="form.modelName"
              @blur="
                () => {
                  $refs.modelName.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="类型" prop="type">
            <a-radio-group v-model="form.type">
              <a-radio value="1">
                类型一
              </a-radio>
              <a-radio value="2">
                类型二
              </a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 20, offset: 4 }">
            <!-- 关联按钮，打开出第二层抽屉 -->
            <a-button @click="showChildrenDrawer">
              关联字段
            </a-button>
            <!-- 已经提交字段区域 -->
            <a-row
              style="
                    margin-top: 20px;
                    padding: 5px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    
                  "
              v-if="checkedList.length > 0"
            >
              <p>已提交字段：</p>
              <div>
                <a-tag
                  color="orange"
                  closable
                  v-for="(v, i) in checkedList"
                  :key="v + i + ''"
                  @close="tagClose(v)"
                >
                  {{ v }}
                </a-tag>
              </div>
            </a-row>
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

      <!-- 第二层抽屉组件 -->
      <relevanceModal
        ref="relevanceModal"
        :checkedList="checkedList"
      ></relevanceModal>
      <!-- 底部区域 -->
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }"
      >
        <a-button type="primary" style="marginRight: 8px" @click="onClose">
          关闭
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import relevanceModal from "@/views/modelList/modal/relevanceModal";
export default {
  props: ["id"],
  data() {
    return {
      //抽屉显示与隐藏
      visible: false,
      //关联字段
      checkedList: [],
      //表单配置
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //表单提交字段
      form: {
        modelName: "",
        type: "",
        desc: ""
      },
      //表单校验规则
      rules: {
        modelName: [
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
            message: "Please select activity type",
            trigger: "change"
          }
        ],
        desc: [{ required: true, message: "请输入描述内容", trigger: "blur" }]
      }
    };
  },
  components: {
    relevanceModal
  },
  methods: {
    //关闭抽屉
    handleClose() {
      this.visible = false;
    },
    //打开抽屉
    handleOpen() {
      this.visible = true;
    },
    //抽屉关闭
    onClose() {
      this.visible = false;
    },
    //打开关联抽屉
    showChildrenDrawer() {
      this.$refs.relevanceModal.handleOpen();
    },
    //表单提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //表单重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //tag关闭事件
    tagClose(v) {
      console.log(v);
      let index = this.checkedList.indexOf(v);
      if (index >= 0) this.checkedList.splice(index, 1);
      console.log(this.checkedList);
    }
  },
  watch: {
    //获取到信息，表示是修改
    id() {
      console.log("子组件" + this.id);
    }
  }
};
</script>
<style lang="scss">
.modal-add-view {
}
</style>
