<template>
  <div class="task-list-wrap">
    <div class="table-search-header">
      <a-row class="header-row">
        <a-col :span="4">
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="table-list-body">
      <a-table
        :loading="loading"
        :data-source="tableData"
        bordered
        :pagination="pagination"
        :locale="locale"
        @change="value => changePag(value)"
        :rowKey="
          (record, index) => {
            return index;
          }
        "
      >
        <a-table-column title="序号" width="70px">
          <template slot-scope="text, record, index">
            {{ ++index }}
          </template>
        </a-table-column>
        <a-table-column title="模型名称" data-index="name" />
        <a-table-column title="状态" width="200px">
          <template slot-scope="record">
            {{ record.status | computeStatus }}
          </template>
        </a-table-column>
        <a-table-column
          title="上一次运行时间"
          width="250px"
          data-index="time"
        />
        <a-table-column key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a @click="handleRowEdit(record)">修改</a>
              <a @click="handleRowCal(record.id)">运算</a>
              <a @click="handleRowExport(record.id)">导出运算结果</a>
              <a @click="handleOperate(record.name, 'startJob', '启用')"
                >启用</a
              >
              <a @click="handleOperate(record.name, 'pauseJob', '暂停')"
                >停用</a
              >
              <!-- <a href="javascript:;" @click="handleRowStop(record.name,'pauseJob')">停用</a> -->
              <a @click="handleOperate(record.name, 'deleteJob', '删除')"
                >删除</a
              >
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <taskModal ref="taskModal" @getDataList="getDataList" />
  </div>
</template>
<script>
import taskModal from "./modal/taskModal";
import {
  get_compute_status as computeStatus,
  compute_status as statusList
} from "@/constant/status";
export default {
  components: { taskModal },
  data() {
    return {
      loading: false,
      locale: { emptyText: "暂无数据" },
      tableData: [
        {
          id: 0,
          name: "模型测试1",
          status: 0,
          time: "2020-12-15"
        },
        {
          id: 1,
          name: "模型测试2",
          status: 1,
          time: "2020-12-16"
        },
        {
          id: 2,
          name: "模型测试3",
          status: 2,
          time: "2020-12-16"
        },
        {
          id: 3,
          name: "模型测试4",
          status: 3,
          time: "2020-12-16"
        }
      ],
      pagination: {
        pageNow: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共有 ${total}条`
      },
      spinning: false,
      statusList,
      searchForm: {
        name: "",
        status: []
      }
    };
  },
  filters: {
    computeStatus
  },
  methods: {
    changePag(val) {
      if (val.pageNow !== val.current) {
        this.pagination.pageNow = val.current;
        this.getDataList();
      }
    },
    handleReset() {},
    //新增按钮
    handleAdd() {
      this.$refs.taskModal.handleOpen();
    },
    //获取表格列表数据
    getDataList() {},
    //修改
    handleRowEdit(data) {
      this.$refs.taskModal.handleOpen(data);
    },
    //运算
    handleRowCal(id) {
      /*eslint no-console:0 */
      console.log(id);
    },
    //导出运算结果
    handleRowExport(id) {
      /*eslint no-console:0 */
      console.log(id);
    },
    //启用
    handleOperate(jobName, method, type) {
      let _this = this;
      _this.$confirm({
        title: "系统提示",
        content: "确定" + type + "吗?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          let params = {
            emulateJSON: true,
            jobName
          };
          _this.$http[method](params).then(res => {
            console.log("res", res);
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
