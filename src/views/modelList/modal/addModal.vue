<template>
  <div class="modal-add-view">
    <!-- <a-drawer title="新增页面" width="50%" :visible="visible" @close="onClose"> -->
    <a-modal
      :title="title"
      :footer="null"
      @cancel="handleClose"
      v-model="visible"
      width="60%"
    >
      <a-row>
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="名称" prop="name">
            <a-input placeholder="请输入模型名称" v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="类型" prop="typeCode">
            <a-select v-model="form.typeCode" placeholder="请选择类型">
              <a-select-option
                :value="item.code"
                v-for="(item, index) in typeList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="描述" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="指标" v-if="title == '修改'">
            <div>
              <a-tag color="orange" v-for="(v, i) in getCheckedList" :key="i">
                {{ v.targetName + "_" + v.desc }}
              </a-tag>
            </div>
          </a-form-model-item>
          <a-form-model-item
            :wrapper-col="{ span: 20, offset: 4 }"
            v-if="title == '新增'"
          >
            <a-button @click="showDrawer">
              关联指标
            </a-button>
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
                  :key="i"
                  @close="tagClose(v)"
                >
                  {{ v.targetName + "_" + v.desc }}
                </a-tag>
              </div>
            </a-row>
          </a-form-model-item>
          <!-- 提交重置区域 -->
          <a-form-model-item
            style="text-align:center"
            :wrapper-col="{ span: 24 }"
          >
            <a-button type="primary" @click="onSubmit()" class="mr10">
              提交
            </a-button>
            <a-button @click="handleClose">
              取消
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-row>

      <!-- 第二层抽屉组件 -->
      <relevanceModal ref="relevanceModal" @getSel="getSel"></relevanceModal>
    </a-modal>
  </div>
</template>
<script>
import relevanceModal from "@/views/modelList/modal/relevanceModal";
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      //抽屉显示与隐藏
      visible: false,
      typeList: [],
      getCheckedList: [],
      checkedList: [],
      //表单配置
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //表单提交字段
      form: {
        name: "",
        typeCode: "",
        desc: ""
      },
      //表单校验规则
      rules: {
        name: [{ required: true, message: "请输入模型名称", trigger: "blur" }],
        typeCode: [
          {
            required: true,
            message: "请输入编码",
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
    getTypeList() {
      this.$http.getTypeList({}).then(res => {
        if (res.code === 1) {
          this.typeList = res.data.data.list;
        }
      });
    },
    getCheckedListFn(infoId) {
      let params = {
        infoId
      };
      this.$http.getTarget({ params }).then(res => {
        console.log("res", res);
        if (res.code === 1) {
          this.getCheckedList = res.data.data;
        }
      });
    },
    getSel(data) {
      /*eslint no-console:[0]*/
      console.log(333, data);
      this.checkedList = data;
    },
    //关闭弹窗
    handleClose() {
      this.visible = false;
    },
    // 打开弹窗
    handleOpen(data) {
      this.visible = true;
      this.getTypeList();
      if (!data) {
        this.form = {};
        this.title = "新增";
      } else {
        console.log("data", data);
        this.form = { ...data };
        this.title = "修改";
        this.getCheckedListFn(data.id);
      }
    },
    //打开关联抽屉
    showDrawer() {
      this.$refs.relevanceModal.handleOpen();
    },
    //表单提交
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { name, typeCode, desc, id } = this.form;
          let params = {
            name,
            typeCode,
            desc
          };
          this.title == "修改" ? (params.id = id) : "";
          let checkedList = this.checkedList.map(v => {
            return v.id;
          });
          this.title == "新增"
            ? (params.targetIds = checkedList.join(","))
            : "";
          let method = this.title == "新增" ? "insertMod" : "updateTarget";
          this.$http[method](params).then(res => {
            console.log("res", res);
            if (res.code === 1) {
              this.$message.success(res.msg);
              this.handleClose();
              this.$emit("getDataList");
            }
          });
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
  }
};
</script>
<style lang="scss"></style>
