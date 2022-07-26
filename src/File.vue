<template>
  <span>
    <el-button :type="type" :size="size" @click="click">
      <slot></slot>
    </el-button>
    <input ref="file" type="file" v-show="false" @change="change" />
  </span>
</template>

<script>

export default {
  name: 'HzFile',
  props: {
    type: String,
    size: String,
  },
  methods: {
    click() {
      this.$refs.file.click();
    },
    change(event) {
      let file = event.target.files[0];
      event.target.value = '';
      this.$emit('opened', file);
    },
  }
};
</script>