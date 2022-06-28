<template>
  <el-tabs v-model="editableTabsValue" type="border-card" @edit="handleTabsEdit">
      <el-tab-pane key="index" label="列表页" name="列表页">
        <slot name="header"></slot>
      </el-tab-pane>
      <el-tab-pane v-for="odx in list" :closable="true" :key="odx.id" :label="odx[label]" :name="odx[name]">
        <slot :data="odx"></slot>
      </el-tab-pane>
  </el-tabs>
</template>
<script>

import _ from "underscore";

export default {
  name: 'Hzhz-page-frame',
  props: {
    label: String,
    name: String,
  },
  data () {
    return {
      list: [],
      editableTabsValue: '列表页'
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    addTab(item) {
      let orderId = item.id;
      let order = _.find(this.list, (x) => x.id === orderId);
      if (order === undefined) {
        this.list.push(item);
      }
    },
    closeTab(id) {
      this.list = _.filter(this.list, x => x.id !== id);
      if (this.list.length === 0) {
        this.editableTabsValue = '列表页';
      }
    },
    getInstance() {
      return _.find(this.list, (odx) => odx.id === this.editableTabsValue);
    },
    switchTab(value) {
      this.editableTabsValue = value;
    },
    handleTabsEdit(targetName, action) {
      if (action === "remove") {
        if (targetName === "列表页") {
          return;
        }
        this.list = _.filter(this.list, (odx) => odx.id !== targetName);
        this.editableTabsValue = "列表页";
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>