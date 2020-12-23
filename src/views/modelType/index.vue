<template>
  <div class="model-management-wrap">
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
        <a-table-column align="center" title="序号" width="70px">
          <template slot-scope="text, record, index">
            {{ ++index }}
          </template>
        </a-table-column>
        <a-table-column
          title="分类名称"
          align="center"
          data-index="name"
          width="200px"
        />
        <a-table-column
          align="center"
          title="类型描述"
          data-index="desc"
          width="200px"
        />
        <a-table-column
          align="center"
          title="类型编码"
          data-index="code"
          width="200px"
        />
        <a-table-column align="center" title="状态" width="200px">
          <template slot-scope="record">
            <!-- {{ record.status | computeStatus }} -->
            <a-switch
              :checked="record.enabled === 1"
              checked-children="已开启"
              un-checked-children="已关闭"
              :disabled="false"
              style="margin-bottom:5px"
            />
          </template>
        </a-table-column>
        <a-table-column align="center" title="创建时间" width="250px">
          <template slot-scope="record">
            {{ record.createTime | formatDate("yyyy-MM-dd hh:mm:ss") }}
          </template>
        </a-table-column>
        <a-table-column align="center" title="更新时间" width="250px">
          <template slot-scope="record">
            {{ record.updateTime | formatDate("yyyy-MM-dd hh:mm:ss") }}
          </template>
        </a-table-column>
        <a-table-column align="center" key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a href="javascript:;" @click="handleOpen(record)">修改</a>
              <a href="javascript:;" @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <!-- 新增对话框组件 -->
    <addModal ref="addModal"></addModal>
  </div>
</template>
<script>
import { formatDate } from "@/utils/utils.js";
import TableSearch from "@/components/commom/TableSearch";
import {
  get_compute_status as computeStatus,
  compute_status as statusList
} from "@/constant/status";
import addModal from "@/views/modelType/modal/addModal";
export default {
  data() {
    return {
      //类型数据
      typeData: [],
      obj: {}, //点击修改按钮时传进子组件，让子组件获取获取信息
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
        code: "",
        name: ""
      }
    };
  },
  components: {
    addModal,
    TableSearch
  },
  filters: {
    computeStatus,
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
      let params = {
        pageSize: this.pagination.pageSize
      };
      if (this.searchForm.name !== "") params.name = this.searchForm.name;
      // if (this.searchForm.code !== "") params.code = this.searchForm.code;
      this.$http.queryTypePageList({ params }).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.data.pageList;
          this.pagination.total = res.data.data.totalCount;
        }
      });
      this.pagination.pageNow = 1;
    },
    //重置按钮
    handleReset() {
      this.searchForm.code = "";
      this.searchForm.name = "";
    },
    //获取表格列表数据
    getDataList() {
      let params = {
        pageNo: this.pagination.pageNow,
        pageSize: this.pagination.pageSize
      };
      this.$http.queryTypePageList({ params }).then(res => {
        if (res.code === 1) {
          this.tableData = res.data.data.pageList;
          this.pagination.total = res.data.data.totalCount;
        }
      });
    },
    handleAdd() {
      this.$refs.addModal.handleOpen();
    },
    //修改
    handleOpen(record) {
      this.$refs.addModal.handleOpen(record);
    },
    //删除
    handleRowDel(id) {
      this.$confirm({
        title: "系统提示",
        content: "确定删除吗?",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          let params = {
            id: id
          };
          this.$http.deleteTypeById({ params }).then(res => {
            if (res.code === 1) {
              this.$message.success("删除成功");
              this.getDataList();
            }
          });
        },
        onCancel() {}
      });
    },
    //获取类型列表数据
    getTypeList() {
      this.$http.queryTypeList().then(res => {
        /*eslint no-console:0 */
        if (res.status === 1) {
          this.typeData = res.data.data.list;
        }
      });
    }
  },
  created() {
    this.getTypeList();
    this.getDataList();
  }
};
</script>
<style lang="scss">
.model-management-wrap {
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
