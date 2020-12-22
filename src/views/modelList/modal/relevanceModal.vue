<template>
  <div class="relevance-modal-view">
    <a-drawer title="关联页面" width="450" :visible="visible" @close="onClose">
      <!-- 关联内容 -->
      <a-row>
        <a-table
          :loading="loading"
          :data-source="tableData"
          bordered
          :scroll="{ y: 240 }"
          :locale="locale"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
        >
          <a-table-column title="序号" width="70px">
            <template slot-scope="text, record, index">
              <a-checkbox
                :checked="comChecked(record.name)"
                @change="onCheckChange(record.name)"
              >
              </a-checkbox>
              {{ ++index }}
            </template>
          </a-table-column>
          <a-table-column title="字段名称" width="150px" data-index="name" />
          <a-table-column title="字段说明" width="150px">
            <template slot-scope="record">
              <!-- {{ record.status | computeStatus }} -->
              {{ record.status }}
            </template>
          </a-table-column>
        </a-table>
      </a-row>
      <!-- 底部区域 -->
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px'
        }"
      >
        <a-button type="primary" @click="onClose">
          关闭
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    checkedList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      //表格多选框数组
      // checkedList: [],
      //抽屉显示与隐藏
      visible: false,
      //表格默认不加载
      loading: false,
      //表格无数据显示
      locale: { emptyText: "暂无数据" },
      //表格数据
      tableData: [
        { name: "字段名称1", status: "字段说明", target: 1 },
        { name: "字段名称2", status: "字段说明1", target: 1 },
        { name: "字段名称3", status: "字段说明2", target: 2 },
        { name: "字段名称4", status: "字段说明3", target: 1 },
        { name: "字段名称5", status: "字段说明4", target: 2 },
        { name: "字段名称6", status: "字段说明5", target: 1 },
        { name: "字段名称7", status: "字段说明6", target: 1 },
        { name: "字段名称8", status: "字段说明7", target: 2 },
        { name: "字段名称9", status: "字段说明8", target: 2 },
        { name: "字段名称10", status: "字段说明9", target: 1 },
        { name: "字段名称11", status: "字段说明10", target: 2 }
      ]
    };
  },
  methods: {
    //关闭抽屉
    handleClose() {
      this.visible = false;
    },
    //打开抽屉
    handleOpen() {
      this.visible = true;
    },
    //抽屉关闭
    onClose() {
      this.visible = false;
    },
    //多选框单击事件
    onCheckChange(id) {
      let index = this.checkedList.indexOf(id);
      //有值则删除
      if (index >= 0) {
        this.checkedList.splice(index, 1);
      } else {
        this.checkedList.push(id);
      }
      //    this.$emit("updateList", this.checkedList);
    }
  },
  computed: {
    comChecked() {
      return function(name) {
        let index = this.checkedList.indexOf(name);
        if (index >= 0) return true;
        return false;
      };
    }
  }
};
</script>
<style lang="scss">
.relevance-modal-view {
}
</style>
