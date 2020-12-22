<!-- 添加指标 -->
<template>
  <div class="level-analysis-wrap">
    <div class="add-header">
      <a-row>
        <a-col :span="20">
          <span
            class="label"
            style="display:inline-block;font-size: 20px; font-weight: 600;margin-left:30px"
            >添加指标</span
          >
        </a-col>
        <a-col :span="4">
          <div class="btn-list">
            <a-button
              style="float:right; background-color:#18a689;color:#fff;border-color:#18a689"
              @click="goOff"
            >
              返回
            </a-button>
          </div>
        </a-col>
      </a-row>
      <a-divider orientation="left" style="color:#18a689">
        添加指标
      </a-divider>
    </div>

    <a-form-model
      ref="ruleForm"
      :model="dynamicValidateForm"
      v-bind="formItemLayoutWithOut"
    >
      <a-form-model-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
        :label="index === 0 ? '请选择您要计算的维度' : ''"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: '维度不能为空！',
          trigger: 'blur'
        }"
      >
        <a-select
          v-model="domain.value"
          style="width: 60%; margin-right: 8px"
          @change="handleChange"
          placeholder="please select your zone"
        >
          <a-select-option value="维度1">
            Zone one
          </a-select-option>
          <a-select-option value="维度2">
            Zone two
          </a-select-option>
          <a-select-option value="维度3">
            Zone two
          </a-select-option>
          <a-select-option value="维度4">
            Zone two
          </a-select-option>
          <a-select-option value="维度5">
            Zone two
          </a-select-option>
        </a-select>

        <a-icon
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          type="minus-circle-o"
          :disabled="dynamicValidateForm.domains.length === 1"
          @click="removeDomain(domain)"
        />
      </a-form-model-item>

      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <a-icon type="plus" /> Add field
        </a-button>
      </a-form-model-item>
      <a-divider orientation="left" style="color:#18a689">
        计算公式 : 维度*权重
      </a-divider>
      <a-form-model-item>
        <a-card style="width:100%;margin:20px auto;">
          <div class="card-all">
            <span>运算符号：</span>
            <a-tag
              v-for="item in operation"
              :key="item"
              @click="addArr(item)"
              >{{ item }}</a-tag
            >
            <span style="margin-left:50px">输入示例：</span>
            <span>维度1*0.1+维度2*0.3+维度3</span>
          </div>

          <a-input
            v-model="dynamicValidateForm.strAll"
            style="margin-top:20px"
          />
        </a-card>
      </a-form-model-item>
      <a-form-model-item v-bind="formItemLayoutWithOutLabel">
        <a-button
          type="primary"
          html-type="submit"
          @click="submitForm()"
          style="margin:0 50px 0 80px"
        >
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm()">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 12, offset: 8 },
          sm: { span: 12, offset: 8 }
        }
      },
      formItemLayoutWithOut: {
        wrapperCol: {
          xs: { span: 18, offset: 3 },
          sm: { span: 18, offset: 3 }
        }
      },

      dynamicValidateForm: {
        domains: [],
        strAll: ""
      },
      operation: ["+", "-", "*", "/", "(", ")", "="],
      form: {
        weight: "",
        operationFirst: "",
        operationSecond: ""
      }
    };
  },
  methods: {
    // 添加函数
    addArr(item) {
      this.dynamicValidateForm.strAll = this.dynamicValidateForm.strAll + item;
      this.form.weight = "";
    },
    goOff() {
      // this.$router.go(-1);
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },

    handleChange(value) {
      this.addArr(value);
    },

    // 提交函数
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.dynamicValidateForm.strAll = "";
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  },
  computed: {
    strSub() {
      let strAll = "";
      for (
        let index = 0;
        index < this.dynamicValidateForm.arr.length;
        index++
      ) {
        let arrStr = this.dynamicValidateForm.arr[index];
        let operationFirst = this.form.operationFirst;
        let weight = this.form.weight;
        let operationSecond = this.form.operationSecond;
        strAll += `${arrStr}
          ${operationFirst}
          ${weight}
          ${operationSecond}`;
      }
      return strAll;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.level-analysis-wrap {
  margin: 20px 20px;
}
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.card-all {
  width: 100%;
  margin: 5px auto;
}
</style>
