<template>
  <div class="factorAnalysisEdit">
    <div class="header"></div>
    <div class="steps">
      <a-steps :current="current" @change="onChange">
        <a-step title="步骤1" description="指标项基本信息" />
        <a-step title="步骤2" description="数据源设置" />
        <a-step title="步骤3" description="指标项计算公式" />
      </a-steps>
    </div>
    <div class="content">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        ref="ruleForm"
      >
        <div class="step1" v-show="current == 0">
          <a-form-model-item
            has-feedback
            label="指标项名称"
            prop="dms_name"
            ref="dms_name"
          >
            <a-input
              v-model="form.dms_name"
              placeholder="指标项名称"
              :disabled="Boolean($route.query.data)"
              @blur="onBlurDmsname"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="指标项介绍">
            <a-input
              type="textarea"
              placeholder="请输入指标项介绍"
              :auto-size="{ minRows: 5, maxRows: 15 }"
              v-model="form.dms_desc"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="nextSteps"> 下一步 </a-button>
          </a-form-model-item>
        </div>
        <div class="step2" v-show="current == 1">
          <a-form-model-item label="数据库" prop="database_id">
            <a-select
              placeholder="请选择数据库"
              v-model="form.database_id"
              @change="getTabs"
            >
              <a-select-option
                :value="item.id"
                v-for="item in dataBaseList"
                :key="item.id"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="数据源类型" prop="dataBaseType">
            <a-radio-group v-model="form.database_type">
              <a-radio :value="0">表</a-radio>
              <a-radio :value="1">字段</a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="数据表名称" prop="tb_name">
            <a-select
              placeholder="请选择数据表名称"
              v-model="form.tb_name"
              @change="getFields(form.tb_name)"
            >
              <a-select-option
                :value="item.table_name"
                v-for="(item, index) in tabsList"
                :key="index"
                >{{
                  item.table_name + "_" + item.table_comment
                }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="数据字段名称"
            prop="fieldsName"
            v-if="form.dataBaseType == '2'"
          >
            <a-select
              placeholder="请选择数据字段名称"
              v-model="form.fieldsName"
            >
              <a-select-option
                :value="item.column_name"
                v-for="(item, index) in fieldsList"
                :key="index"
                >{{
                  item.column_name + "_" + item.column_comment
                }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button style="margin-right: 10px" @click="upSteps"
              >上一步</a-button
            >
            <a-button type="primary" @click="nextSteps">下一步</a-button>
          </a-form-model-item>
        </div>

        <div class="step3" v-show="current == 2">
          <a-form-model-item label="计算公式" prop="self_calc">
            <a-select placeholder="请选择计算公式" v-model="form.self_calc">
              <a-select-option
                :value="item.symbol"
                v-for="(item, index) in symbolList"
                :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            style="margin-top: 20px"
            :wrapper-col="{ span: 14, offset: 4 }"
          >
            <a-button style="margin-right: 10px" @click="upSteps"
              >上一步</a-button
            >
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </a-form-model-item>
        </div>
      </a-form-model>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      symbolList: [],
      tabsList: [],
      dataBaseList: [],
      fieldsList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      id: this.$route.id,
      current: 0, //当前的步骤
      form: {
        dms_name: "",
        dms_desc: "",
        database_id: "",
        database_type: 0,
        tb_name: "",
        fieldsName: "",
        self_calc: ""
      },
      rules: {
        dms_name: [
          { required: true, message: "维度名称不能为空！！", trigger: "blur" }
        ],
        database_id: [
          { required: true, message: "请选择数据库！！", trigger: "change" }
        ],
        dataBaseType: [
          { required: true, message: "请选择数据源类型！！", trigger: "change" }
        ],
        tb_name: [
          { required: true, message: "请选择数据表名称！！", trigger: "change" }
        ],
        fieldsName: [
          { required: true, message: "请选择字段名！！", trigger: "change" }
        ],
        self_calc: [
          {
            required: true,
            message: "请选择计算公式！！",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  created() {
    this.getDataBaseList();
    this.getSymbolList();
    this.$route.query.data
      ? (this.form = { ...JSON.parse(this.$route.query.data) })
      : "";
  },
  methods: {
    // 检查维度名称是否重复
    onBlurDmsname() {
      let params = {
        dmsName: this.form.dms_name
      };
      this.$http.checkByName({ params }).then(res => {
        console.log(888, res);
        if (res.data === true) {
          this.$message.error("该维度名称已存在,请重新输入！");
          this.form.dms_name = "";
        }
      });
    },
    getSymbolList() {
      this.$http.getSymbolList().then(res => {
        /*eslint no-console:[0]*/
        if (res.code === 1) {
          this.symbolList = res.data;
        }
      });
    },
    getTabs(id) {
      let i = this.dataBaseList.findIndex(item => item.id === id);
      this.form.database_name = this.dataBaseList[i].name;
      let params = {
        id
      };
      this.$http.getTabs({ params }).then(res => {
        if (res.code === 1) {
          this.tabsList = res.data;
        }
      });
    },
    getFields(tbname) {
      let params = {
        id: this.form.database_id,
        tbname
      };
      this.$http.getFields({ params }).then(res => {
        if (res.code === 1) {
          this.fieldsList = res.data;
        }
      });
    },
    getDataBaseList() {
      this.$http.getDataBaseList().then(res => {
        if (res.code === 1) {
          this.dataBaseList = res.data;
          console.log("dataBaseList2", this.dataBaseList, this.form);
        }
      });
    },
    onChange(current) {
      if (current == 0) {
        this.current = 0;
      } else if (current == 1) {
        this.$refs.ruleForm.validateField("dms_name", err => {
          if (!err) this.current = current;
        });
      } else if (current == 2) {
        let errNum = 0;
        let arr = [
          "dms_name",
          "database_id",
          "database_type",
          "tb_name",
          "fieldsName"
        ];
        this.$refs.ruleForm.validateField(arr, err => {
          if (err) errNum++;
        });
        if (errNum == 0) this.current = current;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validateField("self_calc", err => {
        if (!err) {
          let params = {
            emulateJSON: true,
            ...this.form
          };
          let method = this.$route.query.data
            ? "updateDimension"
            : "addDimension";
          this.$http[method](params).then(res => {
            console.log("res1299", res);
            if (res.code === 1) {
              this.$message.success(res.msg);
              this.$router.push({
                path: "/dimension"
              });
            }
          });
        }
      });
    },
    back() {
      this.$router.push({
        path: "/dimension"
      });
    },
    nextSteps() {
      this.onChange(this.current + 1);
    },

    upSteps() {
      this.current = this.current - 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.factorAnalysisEdit {
  padding: 30px;
  .header {
    margin-bottom: 50px;
  }
  .content {
    margin-top: 50px;
    .step3 {
      .tip {
        margin-top: 20px;
        margin-bottom: 5px;
        font-weight: 700;
      }
      .nameTag {
        border: 1px solid #d6d6d6;
        padding: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
