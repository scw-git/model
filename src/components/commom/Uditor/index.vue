<template>
  <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    style="height:300px"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  >
  </quill-editor>
</template>
<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进                     // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image"] // 链接、图片、视频
];
export default {
  data() {
    return {
      editorOption: {
        uploadConfig: {},
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: "请输入内容"
      },
      content: null
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(val) {
      /*eslint no-console:[0]*/
      console.log("content", val);
      this.$emit("getContent", val);
      //内容改变事件
    }
  }
};
</script>
