<template>
  <div class="task-list-wrap">
    <div class="table-search-header">
      <a-row>
        <a-col :span="6">
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-col>
        <a-col :span="18">
          <TableSearch
            placeholder="请输入模型名称"
            v-model="title"
            @handleSearch="handleSearch"
          />
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
        @change="changePag"
        :rowKey="
          (record, index) => {
            return index;
          }
        "
      >
        <a-table-column title="序号" width="70px">
          <template slot-scope="text, record, index">
            {{ pagination.pageSize * (pagination.pageNow - 1) + index + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="模型名称" data-index="jobName" />
        <a-table-column title="状态" width="200px">
          <template slot-scope="record">
            {{ record.status | taskStatus }}
          </template>
        </a-table-column>
        <a-table-column
          title="上一次运行时间"
          width="250px"
          data-index="lastRuntime"
        />
        <a-table-column key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a @click="handleRowEdit(record)">修改</a>
              <a
                @click="handleOperate(record.jobName, 'resumeJob', '启用')"
                v-if="record.status == 'PAUSED'"
                >启用</a
              >
              <a
                @click="handleOperate(record.jobName, 'pauseJob', '暂停')"
                v-if="record.status == 'ACQUIRED' || record.status == 'WAITING'"
                >暂停</a
              >
              <!-- <a href="javascript:;" @click="handleRowStop(record.name,'pauseJob')">停用</a> -->
              <a @click="handleOperate(record.jobName, 'deleteJob', '删除')"
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
import TableSearch from "@/components/commom/TableSearch";
import taskModal from "./modal/taskModal";
import {
  get_task_status as taskStatus,
  compute_status as statusList
} from "@/constant/status";
export default {
  components: { taskModal, TableSearch },
  data() {
    return {
      title: "",
      loading: false,
      locale: { emptyText: "暂无数据" },
      tableData: [],
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
    taskStatus
  },
  created() {
    this.getDataList();
  },
  methods: {
    changePag(val) {
      if (val.pageNow !== val.current) {
        this.pagination.pageNow = val.current;
        this.getDataList();
      }
    },
    handleSearch() {
      this.pagination.pageNow = 1;
      this.getDataList();
    },
    handleAdd() {
      this.$refs.taskModal.handleOpen();
    },
    getDataList() {
      const { pageNow, pageSize } = this.pagination;
      let params = {
        emulateJSON: true,
        pageNow: String(pageNow),
        pageSize: String(pageSize),
        title: this.title
      };
      this.$http.getRiskList(params).then(res => {
        /*eslint no-console:[0]*/
        console.log("res", res);
        if (res.data) {
          this.tableData = res.data.list;
        } else {
          this.tableData = [];
        }
      });
    },
    //修改
    handleRowEdit(data) {
      this.$refs.taskModal.handleOpen(data);
    },
    //启用/恢复/删除
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
            if (res.code == 1) {
              _this.getDataList();
              _this.$message.success(res.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
