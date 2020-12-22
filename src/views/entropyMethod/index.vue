<template>
  <div class="entropy-method-wrap">
    <div class="table-search-header">
      <a-row>
        <span>熵值法列表</span>
      </a-row>
      <a-row>
        <a-col :span="6">
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
        <a-col :span="10">
          <div class="search-item">
            <span class="label">状态：</span>
            <div class="val">
              <a-checkbox-group v-model="searchForm.status">
                <a-checkbox
                  :value="item.value"
                  v-for="item in statusList"
                  :key="item.value"
                >
                  {{ item.label }}
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="btn-list">
            <a-button type="primary" @click="handleSearch"
              ><a-icon type="search" />查询</a-button
            >
            <a-button
              type="primary"
              style="background-color:#fff;color:#1c84c6"
              @click="handleReset"
              ><a-icon type="sync" />重置</a-button
            >
            <a-button
              type="primary"
              style="background-color:#f7a54a;border:none"
              @click="handleAdd"
              ><a-icon type="plus" />新增</a-button
            >
          </div>
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
              <a href="javascript:;" @click="handleRowEdit(record.id)">修改</a>
              <a href="javascript:;" @click="handleRowCal(record.id)">运算</a>
              <a href="javascript:;" @click="handleRowExport(record.id)"
                >导出运算结果</a
              >
              <a href="javascript:;" @click="handleRowStart(record.id)">启用</a>
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
import {
  get_compute_status as computeStatus,
  compute_status as statusList
} from "@/constant/status";
export default {
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
    handleSearch() {},
    handleReset() {},
    //新增按钮
    handleAdd() {
      this.$router.push({
        path: "/editModal"
      });
    },
    //获取表格列表数据
    getDataList() {},
    //修改
    handleRowEdit(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$router.push({
        path: "/editModal"
      });
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
    handleRowStart(id) {
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定启用吗?",
        onOk() {
          console.log(id);
        },
        onCancel() {}
      });
    },
    //停用
    handleRowStop(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定停用吗?",
        onOk() {
          console.log(id);
        },
        onCancel() {}
      });
    },
    //删除
    handleRowDel(id) {
      /*eslint no-console:0 */
      console.log(id);
      this.$confirm({
        title: "系统提示",
        content: "确定删除吗?",
        onOk() {
          console.log(id);
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style lang="scss">
.entropy-method-wrap {
}
</style>
