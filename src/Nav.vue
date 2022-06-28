<template>
    <el-menu
      :default-openeds="opened"
      :unique-opened="true"
      class="el-menu-vertical-demo">
      <el-submenu v-for="(item, x) in value" :key="x" :index="item.index" :disabled="!item.enabled">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="(t, i) in item.children" :key="i" :index="t.index" @click="handleOpen(t.index)" :disabled="!t.enabled">
          <span slot="title">{{ t.label }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>
<script>

import _ from "underscore";

export default {
  name: 'HzNav',
  props: {
    data: Array,
  },
  data () {
    return {
      activeMenuIndex: '4-1',
      opened: ['1'],
    };
  },
  computed: {
    value() {
      let ret = [];
      for (let ix in this.data) {
        let data = Object.assign({}, this.data[ix]);
        data.enabled = !_.every(data.children, x => x.enabled === false);
        ret.push(data);
      }
      return ret;
    },
  },
  methods: {
    handleOpen(index) {
      this.$emit('open', index);
    },
  },
};
</script>
