<template>
  <div class="factorAnalysisEdit">
    <div class="header">
      <!-- <a-row>
        <a-col :span="6" style="font-weight: 700">维度编辑</a-col>
        <a-col :span="18" align="right">
          <a-button type="primary" style="margin-right: 30px" @click="back"
            >返回</a-button
          >
        </a-col>
      </a-row> -->
    </div>
    <div class="steps">
      <a-steps :current="current" @change="onChange">
        <a-step title="Step 1" description="维度基本信息" />
        <a-step title="Step 2" description="数据源设置" />
        <a-step title="Step 3" description="维度计算公式" />
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
            label="维度名称"
            prop="dms_name"
            ref="dms_name"
          >
            <a-input
              v-model="form.dms_name"
              placeholder="维度名称"
              @blur="
                () => {
                  $refs.dms_name.onFieldBlur();
                }
              "
            ></a-input>
          </a-form-model-item>
          <a-form-model-item label="维度介绍">
            <a-input
              type="textarea"
              placeholder="请输入维度介绍"
              :auto-size="{ minRows: 5, maxRows: 15 }"
              v-model="form.dms_desc"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="nextSteps"> 下一步 </a-button>
          </a-form-model-item>
        </div>
        <div class="step2" v-show="current == 1">
          <a-form-model-item label="数据库" prop="dataBase">
            <a-select
              placeholder="请选择数据库"
              v-model="form.dataBase"
              @change="getTabs(form.dataBase)"
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
            <a-radio-group v-model="form.dataBaseType">
              <a-radio value="1">表</a-radio>
              <a-radio value="2">字段</a-radio>
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
            <!-- <a-button @click="back">取消</a-button> -->
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
        dataBase: "",
        dataBaseType: "1",
        tb_name: "",
        fieldsName: "",
        self_calc: ""
      },
      rules: {
        dms_name: [
          { required: true, message: "维度名称不能为空！！", trigger: "blur" }
        ],
        dataBase: [
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
    if (this.$route.query.data) {
      this.initData(this.$route.query.data);
      console.log(this.$route.query.data);
    }
  },
  methods: {
    initData(data) {
      this.form = { ...data };
    },
    getSymbolList() {
      this.$http.getSymbolList().then(res => {
        /*eslint no-console:[0]*/
        console.log("res123", res);
        if (res.code === 1) {
          this.symbolList = res.data;
        }
      });
    },
    getTabs(id) {
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
        id: this.form.dataBase,
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
        //校验前两个步骤的所有字段
        let errNum = 0;
        let arr = [
          "dms_name",
          "dataBase",
          "dataBaseType",
          "tb_name",
          "fieldsName"
        ];
        //校验成功也会执行，但什么都不返回，错误会返回字符串
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
          this.$http.addDimension(params).then(res => {
            /*eslint no-console:[0]*/
            console.log("res1299", res);
            if (res.code === 1) {
              this.$message.success("新增成功");
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
