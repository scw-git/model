<template>
  <div class="relevance-modal-view">
    <a-drawer
      title="关联指标"
      width="450"
      :visible="visible"
      @close="handleClose"
    >
      <a-row>
        <a-table
          :loading="loading"
          :data-source="tableData"
          :pagination="pagination"
          bordered
          :locale="locale"
          :rowKey="
            record => {
              return record;
            }
          "
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        >
          <a-table-column title="#" width="70px">
            <template slot-scope="text, record, index">
              {{ pagination.pageSize * (pagination.pageNow - 1) + index + 1 }}
            </template>
          </a-table-column>
          <a-table-column
            title="字段名称"
            width="150px"
            data-index="targetName"
          />
          <a-table-column title="字段说明" width="150px" data-index="desc">
          </a-table-column>
        </a-table>
      </a-row>
      <a-button style="float:right" type="primary" @click="submitSel"
        >确定</a-button
      >
      <a-button style="float:right" class="mr10" @click="handleClose"
        >取消</a-button
      >
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedRowKeys: [],
      pagination: {
        pageNow: 1,
        pageSize: 5,
        total: 0,
        showTotal: total => `共有 ${total}条`
      },
      visible: false,
      loading: false,
      locale: { emptyText: "暂无数据" },
      tableData: []
    };
  },
  methods: {
    submitSel() {
      this.handleClose();
      this.$emit("getSel", this.selectedRowKeys);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    handleClose() {
      this.visible = false;
    },
    handleOpen() {
      this.visible = true;
      this.showAllTarget();
    },
    showAllTarget() {
      const { pageNow, pageSize } = this.pagination;
      let params = {
        emulateJSON: true,
        page: pageNow,
        pageSize,
        targetName: ""
      };
      this.$http.showAllTarget(params).then(res => {
        /*eslint no-console:[0]*/
        if (res.data) {
          this.tableData = res.data.list;
          this.pagination.total = res.data.total;
        }
      });
    }
  }
};
</script>
<style lang="scss"></style>
