<template>
  <div class="huaz-search">
    <el-row class="search-input">
      <el-col :span="left" >
          <el-row v-for="(items, x) in list" :key="x">
              <el-col class="col-padding" :span="items.length <= 6 ? 4 : 3" v-for="(item, x) in items" :key="x">
                  <el-input v-if="item.type === 'input' || !!item.type === false " v-model.trim="query[item.prop]" :size="item.size" :placeholder="item.name" clearable></el-input>
              </el-col>
          </el-row>
      </el-col>
      <el-col :span="right" class="col-padding" style="text-align: right;">
          <slot name="start"></slot>
          <el-button size="mini" :type="button_type" @click="search">{{ button_label }}</el-button>
          <slot name="end"></slot>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import _ from "underscore";

export default {
  name: 'Hzhz-search-bar',
  props: {
      width: Number,
      list: Array,
      buttonType: String,
      label: String,
  },
  data () {
    return {
      query: {},
      left: 0,
      right: 0,
      span: 4,
      button_type: 'primary',
      button_label: '搜索',
    };
  },
  async created() {
      let items = _.flatten(this.list);
      for (let ix in items) {
        let item = items[ix];
        this.$set(this.query, item.prop, '');
      }
      this.left = this.width;
      this.right = 24 - this.left;
      
  },
  methods: {
    search () {
      this.$emit('search', this.query);
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
