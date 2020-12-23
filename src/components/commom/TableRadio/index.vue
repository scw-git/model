<template>
  <div class="search-item">
    <span class="label">{{ label }}</span>
    <a-radio-group v-model="model" @change="change" style="line-height:32px;">
      <a-radio :value="item.value" v-for="item in options" :key="item.value">
        {{ item.label }}
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  name: "TableRadio",
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
      type: Number
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
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
      this.$emit("search", value.target.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.select {
  width: 95px;
}
</style>
