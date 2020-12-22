<template>
  <div class="model-management-wrap">
    <!-- 头部区域 -->
    <div class="table-search-header">
      <a-row class="header-row">
        <a-row>
          <span class="top-title">模型分类</span>
        </a-row>
        <a-row>
          <a-col :span="6">
            <div class="search-item">
              <span class="label">分类名称：</span>
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
              <span class="label">类型：</span>
              <div class="val">
                <a-select
                  placeholder="请选择类型"
                  style="width: 150px"
                  @change="handleTypeChange"
                  v-model="searchForm.code"
                >
                  <a-select-option value="">
                    查询所有
                  </a-select-option>
                  <a-select-option
                    v-for="(v, i) in typeData"
                    :key="i + 'i'"
                    :value="v.code"
                  >
                    {{ v.name }}
                  </a-select-option>
                </a-select>

                <!-- <a-checkbox-group v-model="searchForm.status">
                  <a-checkbox
                    :value="item.value"
                    v-for="item in statusList"
                    :key="item.value"
                  >
                    {{ item.label }}
                  </a-checkbox>
                </a-checkbox-group> -->
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
        <a-table-column title="分类名称" data-index="name" />
        <a-table-column title="类型描述" data-index="desc" />
        <a-table-column title="类型编码" data-index="code" />
        <a-table-column title="状态" width="200px">
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
        <a-table-column
          title="创建时间"
          width="250px"
          data-index="createTime"
        />
        <a-table-column
          title="更新时间"
          width="250px"
          data-index="updateTime"
        />
        <a-table-column key="action" title="操作" width="300px">
          <template slot-scope="record">
            <div class="table-op-link">
              <a href="javascript:;" @click="handleRowEdit(record)">修改</a>
              <a href="javascript:;" @click="handleRowStart(record.id)">启用</a>
              <a href="javascript:;" @click="handleRowStop(record.id)">停用</a>
              <a href="javascript:;" @click="handleRowDel(record.id)">删除</a>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <!-- 新增对话框组件 -->
    <addModal ref="addModal" :obj="obj"></addModal>
  </div>
</template>
<script>
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
      obj: "", //点击修改按钮时传进子组件，让子组件获取获取信息
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
    addModal
  },
  filters: {
    computeStatus
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
      this.getDataList();
      this.pagination.pageNow = 1;
    },
    //重置按钮
    handleReset() {
      this.searchForm.code = "";
      this.searchForm.name = "";
    },
    //新增按钮
    handleAdd() {
      //打开对话框
      this.$refs.addModal.handleOpen();
    },
    //获取表格列表数据
    getDataList() {
      //无搜索
      if (this.searchForm.name === "" && this.searchForm.code === "") {
        var params = {
          pageNo: this.pagination.pageNow,
          pageSize: this.pagination.pageSize
        };
      } else {
        var params = {
          pageSize: this.pagination.pageSize
        };
        if (this.searchForm.name !== "") params.name = this.searchForm.name;
        if (this.searchForm.code !== "") params.code = this.searchForm.code;
      }
      this.$http.queryTypePageList({ params }).then(
        res => {
          if (res.code === 1) {
            this.tableData = res.data.data.pageList;
            this.pagination.total = res.data.data.totalCount;
          }
        },
        err => {
          return this.$message.error("获取不到列表数据");
        }
      );
    },
    //修改
    handleRowEdit(record) {
      this.obj = record;
      this.handleAdd();
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
      this.$confirm({
        title: "系统提示",
        content: "确定删除吗?",
        onOk: () => {
          let params = {
            id: id
          };
          this.$http.deleteTypeById({ params }).then(
            res => {
              if (res.code === 1) {
                this.$message.success("删除成功");
                this.getDataList();
              }
            },
            err => {
              return this.$message.error("删除失败");
            }
          );
        },
        onCancel() {}
      });
    },
    //获取类型列表数据
    getTypeList() {
      this.$http.queryTypeList().then(
        res => {
          /*eslint no-console:0 */
          if (res.status === 1) {
            this.typeData = res.data.data.list;
          }
        },
        err => {
          return this.$message.error("获取不到类型数据");
        }
      );
    },
    //选择类型改变事件
    handleTypeChange() {}
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
