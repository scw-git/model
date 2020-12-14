<template>
  <div class="search-item">
    <span class="label">{{ label }}</span>
    <a-select
      v-model="model"
      style="width: 200px;display:block-inline;"
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
      type: [Number, String]
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {
    /*eslint no-console:[0]*/
    console.log("value", this.value);
  },
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
