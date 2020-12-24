<template>
  <div class="model-analysis-wrap">
    <!-- 头部区域 -->
    <div class="table-search-header">
      <a-row>
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
    <!-- 展示列表 -->
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
        <a-table-column title="描述" width="200px" data-index="desc">
        </a-table-column>
        <a-table-column title="更新时间" width="150px">
          <template slot-scope="record">
            {{ record.updateTime | formatDate("yyyy-MM-dd hh:mm:ss") }}
          </template>
        </a-table-column>
        <a-table-column title="创建时间" width="150px">
          <template slot-scope="record">
            {{ record.createTime | formatDate("yyyy-MM-dd hh:mm:ss") }}
          </template>
        </a-table-column>
        <a-table-column key="zhibiao" title="关联指标id" width="300px">
          <template slot-scope="record">
            {{ record.computerResultTable }}
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a @click="handleRowEdit(record)">修改</a>
              <a @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <addModal ref="addModal" @getDataList="getDataList" />
  </div>
</template>
<script>
import { formatDate } from "@/utils/utils.js";
import TableSearch from "@/components/commom/TableSearch";
import { compute_status as statusList } from "@/constant/status";
import addModal from "@/views/modelList/modal/addModal";
export default {
  data() {
    return {
      id: "", //点击修改按钮时传进子组件，让子组件获取通过id获取信息
      //表格默认不加载
      loading: false,
      //表格无数据显示
      locale: { emptyText: "暂无数据" },
      //表格数据
      tableData: [],
      //分页器
      pagination: {
        pageNow: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共有 ${total}条`
      },
      //状态列表
      statusList,
      //搜素表单
      searchForm: {
        name: "",
        typeCode: ""
      }
    };
  },
  components: {
    addModal,
    TableSearch
  },
  created() {
    this.getDataList();
  },
  filters: {
    formatDate
  },
  methods: {
    //分页改变
    changePag(val) {
      if (val.pageNow !== val.current) {
        this.pagination.pageNow = val.current;
        this.getDataList();
      }
    },
    //查询按钮
    handleSearch() {
      this.pagination.pageNow = 1;
      this.getDataList();
    },
    //重置按钮
    handleReset() {},
    //新增按钮
    handleAdd() {
      this.$refs.addModal.handleOpen();
    },
    //获取表格列表数据
    getDataList() {
      const { pageNow, pageSize } = this.pagination;
      let params = {
        emulateJSON: true,
        pageNo: pageNow,
        pageSize
      };
      this.searchForm.name ? (params.name = this.searchForm.name) : "";
      this.searchForm.typeCode
        ? (params.typeCode = this.searchForm.typeCode)
        : "";
      this.$http.getModList({ params }).then(res => {
        console.log("res123", res);
        if (res.code == 1) {
          this.tableData = res.data.data.pageList;
          this.pagination.total = res.data.data.totalCount;
        }
      });
    },
    //修改
    handleRowEdit(data) {
      this.$refs.addModal.handleOpen(data);
    },
    //删除
    handleRowDel(id) {
      /*eslint no-console:0 */
      let _this = this;
      this.$confirm({
        title: "系统提示",
        content: "确定删除吗?",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          let params = {
            id
          };
          _this.$http.deleteTarget({ params }).then(res => {
            console.log("删除", res);
            if (res.code == 1) {
              _this.$message.success(res.msg);
              _this.getDataList();
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.model-analysis-wrap {
  .table-search-header {
    .header-row {
      border-left: 4px solid #c2c2c2;
      background-color: #f5f5f5;
      padding: 5px;
      .top-title {
        padding-top: 5px;
        font-size: 18px;
        color: #676a6c;
        font-weight: 700;
      }
    }
  }
}
</style>
