<template>
  <div>
    <a-modal
      title="添加指标"
      :footer="null"
      @cancel="handleClose"
      v-model="visible"
      width="60%"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div>
          <ArticleTitle title="添加指标" />
          <div v-if="targetArr.length > 0">
            <a-row v-for="(item, index) in targetArr" :key="index">
              指标{{ index }}:{{ item.targetName }}
            </a-row>
          </div>
          <a-form-model-item label="选择指标">
            <a-select
              v-model="form.target"
              placeholder="please select your zone"
              @change="changeSel"
            >
              <a-select-option
                :value="item.id"
                v-for="(item, index) in allTargetList"
                :key="index"
              >
                {{ item.targetName }}
              </a-select-option>
            </a-select>
            <a-button type="primary" style="margin-top:20px" @click="addTarget"
              >添加指标</a-button
            >
          </a-form-model-item>
        </div>
        <a-form-model-item :wrapper-col="{ span: 24 }">
          <ArticleTitle title="计算公式 : 指标项*权重" />
          <a-row>
            <a-col :span="10">
              <h4>
                输入示例：指标项1*0.1+指标项2*0.3+指标项3
              </h4>
            </a-col>
            <a-col
              :span="2"
              v-for="(item, index) in operateSymbolArr"
              :key="index"
              ><a-button>
                {{ item }}
              </a-button></a-col
            >
          </a-row>
        </a-form-model-item>
        <a-form-model-item label="公式">
          <a-input
            v-model="form.formula"
            placeholder="请按示例规范输入公式"
            autocomplete="off"
          >
          </a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 6, offset: 10 }">
          <a-button type="primary" class="mr10">确定</a-button>
          <a-button>取消</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import ArticleTitle from "@/components/commom/ArticleTitle/index.vue";
export default {
  data() {
    return {
      operateSymbolArr: ["+", "-", "*", "/", "(", ")"],
      targetArr: [],
      allTargetList: [],
      visible: false,
      rules: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        target: "",
        formula: ""
      }
    };
  },
  components: {
    ArticleTitle
  },
  watch: {},
  created() {},
  methods: {
    changeSel(val) {
      console.log("addTarget", val);
    },
    addTarget() {
      console.log("addTarget", this.form.target);
    },
    showAllTarget() {
      let params = {
        emulateJSON: true,
        page: 1
      };
      this.$http.showAllTarget(params).then(res => {
        /*eslint no-console:[0]*/
        if (res.data) {
          this.allTargetList = res.data.list;
        }
      });
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen(info) {
      this.showAllTarget();
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
