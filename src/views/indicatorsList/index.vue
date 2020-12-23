<!--指标列表-->
<template>
  <div class="level-analysis-wrap">
    <div class="table-search-header">
      <a-row>
        <!-- <a-col :span="16">
          <div class="search-item">
            <span class="label">模型名称：</span>
            <div class="val">
              <a-input
                v-model="searchForm.name"
                placeholder="请输入模型名称"
                autocomplete="off"
              ></a-input>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="btn-list">
            <a-button type="primary" @click="handleAdd">新增</a-button>
          </div>
        </a-col> -->
        <a-col :span="6">
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-col>
        <a-col :span="18">
          <TableSearch
            placeholder="请输入模型名称"
            v-model="searchForm.name"
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
          data-index="target_name"
          align="center"
        />
        <a-table-column title="指标算法" data-index="formula" align="center" />
        <a-table-column title="创建时间" data-index="crtime" align="center" />
        <a-table-column title="修改时间" data-index="utime" align="center" />
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
        <a-table-column title="备注" data-index="desc" align="center" />
        <a-table-column key="action" title="操作" width="220px" align="center">
          <template slot-scope="record">
            <div class="table-op-link">
              <a href="javascript:;" @click="handleRowView(record.id)">查看</a>
              <a href="javascript:;" @click="handleRowEdit(record.id)">修改</a>
              <a href="javascript:;" @click="handleRowCal(record.id)">运算</a>
              <a href="javascript:;" @click="handleRowStop(record.id)">停用</a>
              <a href="javascript:;" @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>
<script>
import TableSearch from "@/components/commom/TableSearch";
import {
  get_compute_status as computeStatus,
  compute_status as statusList
} from "@/constant/status";

export default {
  components: {
    TableSearch
  },
  data() {
    return {
      loading: false,
      locale: { emptyText: "暂无数据" },
      tableData: [
        {
          id: 0,
          target_name: "维度测试1",
          formula: "111",
          status: 0,
          crtime: "2020-12-15",
          utime: "2020-12-15",
          type: "1",
          desc: "指标"
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
    handleSearch() {},
    handleReset() {
      this.searchForm = {};
    },
    handleAdd() {
      this.$router.push({
        path: "/indicatorsList/addIndicators"
      });
      // this.$router.push({
      //   path: "/levelAnalysis/addLevelAnalysis"
      // });
    },
    //获取表格列表数据
    getDataList() {},
    handleRowEdit(id) {
      /*eslint no-console:0 */
      console.log(id);
    },
    handleRowCal(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定运算吗",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    handleRowView() {},
    handleRowStop(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定停用吗",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    handleRowDel(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定删除吗",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style lang="scss">
// .level-analysis-wrap {
// }
</style>
