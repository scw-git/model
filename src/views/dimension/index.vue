<template>
  <div class="typeManagement">
    <div class="table-search-header">
      <a-row>
        <a-col :span="16">
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-col>
        <a-col :span="8">
          <TableSearch
            placeholder="请输入指标名称"
            v-model="searchValue"
            @handleSearch="handleSearch"
          />
        </a-col>
      </a-row>
    </div>
    <div class="table-list-body">
      <a-table
        :data-source="tableData"
        bordered
        :pagination="pagination"
        @change="changePag"
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
        <a-table-column title="名称" data-index="dms_name" />
        <a-table-column title="介绍" data-index="dms_desc" />
        <a-table-column title="创建时间">
          <template slot-scope="record">
            {{ record.crtime | formatDate("yyyy-MM-dd hh:mm:ss") }}
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a href="javascript:;" @click="handleRowEdit(record)">修改</a>
              <a href="javascript:;" @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/utils.js";
import TableSearch from "@/components/commom/TableSearch";
export default {
  components: {
    TableSearch
  },
  data() {
    return {
      searchValue: "",
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共有 ${total}条`
      }
    };
  },
  created() {
    this.getDataList();
  },
  filters: {
    formatDate
  },
  methods: {
    handleRowDel(id) {
      let _this = this;
      this.$confirm({
        title: "确定要删除该信息",
        okText: "确定",
        okType: "primary",
        cancelText: "取消",
        onOk() {
          //发起删除请求
          let params = {
            id
          };
          _this.$http.delDimension({ params }).then(res => {
            if (res.code === 1) {
              _this.$message.success(res.msg);
              _this.getDataList();
            } else {
              _this.$message.error(res.msg);
            }
          });
        }
      });
    },
    changePag(val) {
      if (val.pageNow !== val.current) {
        this.pagination.pageNum = val.current;
        this.getDataList();
      }
    },
    //获取数据列表
    getDataList() {
      const { pageNum, pageSize } = this.pagination;
      let params = {
        pageNum,
        pageSize,
        searchKey: this.searchValue
      };
      this.$http.getDimensionList({ params }).then(res => {
        /*eslint no-console:[0]*/
        if (res.code === 1) {
          this.tableData = res.data.list;
          this.pagination.total = res.data.total;
        }
      });
    },
    handleAdd() {
      this.$router.push({
        path: "/dimensionCreateAndEdit"
      });
    },
    handleSearch() {
      this.pagination.pageNum = 1;
      this.getDataList();
    },
    handleRowEdit(record) {
      this.$router.push({
        path: "/dimensionCreateAndEdit",
        query: {
          data: JSON.stringify(record)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-list {
  float: right;
}
</style>
