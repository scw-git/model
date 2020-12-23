<template>
  <div class="search-item">
    <span class="label">{{ label }}</span>
    <a-select
      v-model="model"
      :mode="mode"
      :style="styleSelect"
      @change="change"
    >
      <a-select-option v-for="item in options" :key="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  name: "TableSelect",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String, Array]
    },
    options: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: "default"
    },
    styleSelect: {
      type: String,
      default: "width: 200px;display:block-inline;"
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  },
  methods: {
    change(value) {
      this.$emit("search", value);
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  width: 95px;
}
</style>
