<!--指标列表-->
<template>
  <div class="level-analysis-wrap">
    <div class="table-search-header">
      <a-row>
        <a-col :span="6">
          <a-button type="primary" @click="handleAddOld" class="mr10"
            >新增</a-button
          >
          <a-button type="primary" @click="handleAdd">新增11</a-button>
        </a-col>
        <a-col :span="18">
          <TableSearch
            placeholder="请输入模型名称"
            v-model="targetName"
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
        @change="value => changePag(value)"
        :rowKey="
          (record, index) => {
            return index;
          }
        "
      >
        <a-table-column title="序号" width="70px" align="center">
          <template slot-scope="text, record, index">
            {{ ++index }}
          </template>
        </a-table-column>
        <a-table-column
          title="维度名称"
          data-index="targetName"
          align="center"
        />
        <a-table-column title="指标算法" data-index="formula" align="center" />
        <a-table-column
          title="加分项或减分项"
          data-index="type"
          align="center"
        />
        <a-table-column title="状态" align="center">
          <template slot-scope="record">
            {{ record.status | computeStatus }}
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" width="220px" align="center">
          <template slot-scope="record">
            <div class="table-op-link">
              <a @click="handleRowView(record)">查看</a>
              <a @click="handleRowEdit(record.id)">修改</a>
              <a @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <viewFnModal ref="viewFnModal" />
    <indicatorModal ref="indicatorModal" @getDataList="getDataList" />
  </div>
</template>
<script>
import viewFnModal from "./modal/viewFnModal";
import indicatorModal from "./modal/indicatorModal";
import TableSearch from "@/components/commom/TableSearch";
import {
  get_compute_status as computeStatus,
  compute_status as statusList
} from "@/constant/status";

export default {
  components: {
    TableSearch,
    indicatorModal,
    viewFnModal
  },
  data() {
    return {
      targetName: "",
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
      statusList
    };
  },
  filters: {
    computeStatus
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
    handleSearch() {},
    handleReset() {
      this.searchForm = {};
    },
    handleAddOld() {
      this.$router.push({
        path: "/indicatorsList/addIndicators"
      });
    },
    handleAdd() {
      this.$refs.indicatorModal.handleOpen();
    },
    //获取表格列表数据
    getDataList() {
      const { pageNow, pageSize } = this.pagination;
      let params = {
        emulateJSON: true,
        page: pageNow,
        pageSize,
        targetName: ""
      };
      this.$http.showAllTarget(params).then(res => {
        console.log("res", res);
        if (res.data) {
          this.tableData = res.data.list;
        }
      });
    },
    handleRowEdit(id) {
      /*eslint no-console:0 */
      console.log(id);
    },
    handleRowDel(tid) {
      let _this = this;
      _this.$confirm({
        title: "系统提示",
        content: "确定删除吗",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          let params = {
            tid
          };
          _this.$http.delTarget({ params }).then(res => {
            console.log("res22", res);
            // if (res.data) {
            // }
          });
        },
        onCancel() {}
      });
    },
    handleRowView(data) {
      this.$refs.viewFnModal.handleOpen(data);
    }
  }
};
</script>
<style lang="scss">
// .level-analysis-wrap {
// }
</style>
