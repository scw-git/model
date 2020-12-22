<template>
  <div style="padding: 30px;">
    <!-- 头部区域 -->
    <a-row style="padding-bottom:20px">
      <a-col :span="12" style="font-size:20px;font-weight:700">
        <span>熵值法编辑</span>
      </a-col>
      <a-col :span="12" align="right">
        <a-button type="primary" style="margin-right:10px"
          ><a-icon type="play-circle" />运行</a-button
        >
        <a-button type="primary" @click="goBack"
          ><a-icon type="arrow-left" />返回</a-button
        >
      </a-col>
    </a-row>
    <!-- 步骤条 -->
    <a-row>
      <a-steps :current="current - 0" @change="onChange">
        <a-step title="Step 1" description="模型基本信息" />
        <a-step title="Step 2" description="数据源设置" />
        <a-step title="Step 3" description="数据字段设置" />
      </a-steps>
    </a-row>
    <!-- 表单内容区域 -->
    <a-row>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div v-show="current === 0" style="margin:50px auto;">
          <a-form-model-item ref="modelName" label="模型名称" prop="modelName">
            <a-input
              v-model="form.modelName"
              placeholder="模型名称"
              @blur="
                () => {
                  $refs.modelName.onFieldBlur();
                }
              "
            />
          </a-form-model-item>
          <a-form-model-item label="模型介绍" prop="desc">
            <a-input
              v-model="form.desc"
              placeholder="请输入模型源介绍"
              type="textarea"
            />
          </a-form-model-item>
          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="16">
              <a-button type="primary" @click="nextStep"
                >下一步<a-icon type="right-circle"
              /></a-button>
            </a-col>
          </a-row>
        </div>

        <div v-show="current === 1">
          <a-form-model-item label="数据库" prop="dataBase">
            <a-select v-model="form.dataBase" placeholder="请选择数据库">
              <a-select-option value="数据库一">
                数据库一
              </a-select-option>
              <a-select-option value="数据库二">
                数据库二
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="数据源类型" prop="dataBaseType">
            <a-radio-group v-model="form.dataBaseType">
              <a-radio value="表">
                表
              </a-radio>
              <a-radio value="视图">
                视图
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="数据源名称" prop="dataOrigin">
            <a-select v-model="form.dataOrigin" placeholder="请选择数据源">
              <a-select-option value="数据源一">
                数据源一
              </a-select-option>
              <a-select-option value="数据源二">
                数据源二
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="数据源介绍" prop="dataOriginDesc">
            <a-input
              v-model="form.dataOriginDesc"
              placeholder="请输入数据源介绍"
              type="textarea"
            />
          </a-form-model-item>
          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="16">
              <a-button
                @click="previousStep"
                type="primary"
                style="margin-right:10px"
                ><a-icon type="left-circle" />上一步</a-button
              >
              <a-button type="primary" style="margin-right:10px"
                >测试<a-icon type="cloud-upload"
              /></a-button>
              <a-button @click="nextStep" type="primary"
                >下一步<a-icon type="right-circle"
              /></a-button>
            </a-col>
          </a-row>
        </div>

        <div v-show="current === 2">
          <a-row>
            <a-table
              :loading="loading"
              :data-source="tableData"
              bordered
              :scroll="{ y: 240 }"
              :locale="locale"
              :rowKey="
                (record, index) => {
                  return index;
                }
              "
            >
              <a-table-column title="序号" width="70px">
                <template slot-scope="text, record, index">
                  <a-checkbox
                    :checked="comChecked(record.name)"
                    @change="onCheckChange(record.name)"
                  >
                  </a-checkbox>
                  {{ ++index }}
                </template>
              </a-table-column>
              <a-table-column title="字段名称" data-index="name" />
              <a-table-column title="字段说明" width="200px">
                <template slot-scope="record">
                  <!-- {{ record.status | computeStatus }} -->
                  {{ record.status }}
                </template>
              </a-table-column>
              <a-table-column
                key="action"
                title="正向指标/负向指标"
                width="300px"
              >
                <template slot-scope="record">
                  <div>
                    <a-radio-group
                      name="radioGroup"
                      :default-value="record.target"
                    >
                      <a-radio :value="1">
                        正向指标
                      </a-radio>
                      <a-radio :value="2">
                        负向指标
                      </a-radio>
                    </a-radio-group>
                  </div>
                </template>
              </a-table-column>
            </a-table>
          </a-row>
          <!-- 提交字段 -->
          <a-card v-if="checkedList.length > 0">
            <div>提交字段：</div>
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
          </a-card>

          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="16">
              <a-button
                @click="previousStep"
                type="primary"
                style="margin-right:10px"
                ><a-icon type="left-circle" />上一步</a-button
              >
              <a-button type="primary" style="margin-right:10px"
                >提交选择字段<a-icon type="cloud-upload"
              /></a-button>
              <a-button type="primary" @click="onSubmit" style="color:#fff"
                >提交<a-icon type="right-circle"
              /></a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-model>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //表格多选框数组
      checkedList: [],
      //表格默认不加载
      loading: false,
      //表格无数据显示
      locale: { emptyText: "暂无数据" },
      //表格数据
      tableData: [
        { name: "字段名称1", status: "字段说明", target: 1 },
        { name: "字段名称2", status: "字段说明1", target: 1 },
        { name: "字段名称3", status: "字段说明2", target: 2 },
        { name: "字段名称4", status: "字段说明3", target: 1 },
        { name: "字段名称5", status: "字段说明4", target: 2 },
        { name: "字段名称6", status: "字段说明5", target: 1 },
        { name: "字段名称7", status: "字段说明6", target: 1 },
        { name: "字段名称8", status: "字段说明7", target: 2 },
        { name: "字段名称9", status: "字段说明8", target: 2 },
        { name: "字段名称10", status: "字段说明9", target: 1 },
        { name: "字段名称11", status: "字段说明10", target: 2 }
      ],
      //默认步骤条在第一个
      current: 0,
      //表单标题与内容划分
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      //表单数据
      form: {
        modelName: "",
        desc: "",
        dataBase: undefined,
        dataBaseType: "",
        dataOrigin: undefined,
        dataOriginDesc: ""
      },
      //表单校验规则
      rules: {
        modelName: [
          {
            required: true,
            message: "请输入模型名称",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: false,
            message: "请输入模型介源绍",
            trigger: "blur"
          }
        ],
        dataBase: [
          {
            required: true,
            message: "请选择数据库",
            trigger: "change"
          }
        ],
        dataBaseType: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        dataOrigin: [
          {
            required: true,
            message: "请选择数据源",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //步骤条改变事件
    onChange(current) {
      if (current === 1) {
        //校验第一步骤的字段是否符合要求
        this.$refs.ruleForm.validateField("modelName", err => {
          if (err) return;
          this.current = current;
        });
      } else if (current === 2) {
        //校验第一，二步骤的字段是否符合要求
        let arr = ["modelName", "dataBase", "dataBaseType", "dataOrigin"];
        let errNum = 0;
        this.$refs.ruleForm.validateField(arr, err => {
          if (err) errNum++;
        });

        if (errNum === 0) this.current = current;
      } else {
        this.current = current;
      }
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //下一步
    nextStep() {
      let num = this.current + 1;
      this.onChange(num);
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
    //多选框单击事件
    onCheckChange(id) {
      let index = this.checkedList.indexOf(id);
      //有值则删除
      if (index >= 0) {
        this.checkedList.splice(index, 1);
      } else {
        this.checkedList.push(id);
      }
    },
    //上一步
    previousStep() {
      this.current -= 1;
    },
    //tag关闭事件
    tagClose(v) {
      console.log(v);
      let index = this.checkedList.indexOf(v);
      if (index >= 0) this.checkedList.splice(index, 1);
      console.log(this.checkedList);
    }
  },
  computed: {
    comChecked() {
      return function(name) {
        let index = this.checkedList.indexOf(name);
        if (index >= 0) return true;
        return false;
      };
    }
  }
};
</script>
<style lang="scss" scoped></style>
