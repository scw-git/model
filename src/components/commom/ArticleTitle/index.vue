<template>
  <h3 class="detail-title" :style="titleStyle ? titleStyle : ''">
    {{ title }}
    <slot
      ><a-icon type="more" v-if="more" style="float:right;" @click="moreFn"
    /></slot>
  </h3>
</template>
<script>
export default {
  name: "news-title",
  props: {
    title: {
      type: String
    },
    titleStyle: {
      type: String
    },
    more: {
      type: Boolean,
      default: false
    },
    pagePath: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    moreFn() {
      if (this.pagePath) {
        window.open(this.pagePath, "_blank");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-title {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 22px;
  height: 22px;
  &:before {
    content: "";
    float: left;
    width: 5px;
    height: 22px;
    background: #1890ff;
    margin-right: 10px;
  }
}
</style>
