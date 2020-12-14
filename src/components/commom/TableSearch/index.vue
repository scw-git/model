<template>
  <div class="table-search">
    <a-input-search
      :placeholder="placeholder"
      :style="style_search"
      @search="search"
      v-model="model"
    />
  </div>
</template>
<script>
export default {
  name: "TableSearch",
  model: {
    prop: "value",
    event: "search"
  },
  props: {
    placeholder: {
      type: String,
      default: "在结果中搜索"
    },
    // 是否带有搜索前缀
    optionInput: {
      type: Array,
      default: () => []
    },
    // 两种形式：对象或keyword：{searchType: xxx, keyword: xxx} || keyword: xxx
    value: [String, Object],
    style_search: {
      type: String,
      default: "width:200px"
    }
  },
  data() {
    return {
      isHasOption: false
    };
  },
  computed: {
    model: {
      get() {
        if (this.isHasOption) {
          return this.value.keyword;
        } else {
          return this.value;
        }
      },
      set(value) {
        if (this.isHasOption) {
          this.$emit("search", {
            searchType: this.value.searchType,
            keyword: value
          });
        } else {
          this.$emit("search", value);
        }
      }
    }
  },
  methods: {
    search() {
      this.$nextTick(() => {
        if (this.isHasOption) {
          this.$emit("handleSearch", {
            searchType: this.value.searchType,
            keyword: this.value.keyword
          });
        } else {
          this.$emit("handleSearch", this.value);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.table-search {
  display: inline-block;
  line-height: 32px;
  height: 32px;
  display: flex;
  justify-content: flex-end;
  .search-input {
    float: left;
  }
}
</style>
