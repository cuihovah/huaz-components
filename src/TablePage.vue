<template>
  <div class="huaz-table-page">
    <slot name="header"></slot>
    <slot></slot>
    <el-pagination
      @size-change="handleSizeChange"
      style="text-align:center"
      @current-change="changePage"
      :current-page="currentPage"
      :page-size="limit"
      :page-sizes="[50, 100, 200, 500, 10000]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>

// import _ from "underscore";

export default {
  name: 'Hzhz-table-page',
  data () {
    return {
      total: 0,
      currentPage: 1,
      limit: 100,
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    },
  },
  methods: {
    async handleSizeChange(val) {
      this.limit = val;
      await this.$emit('search', this.limit, this.offset);
    },
    async reset(total) {
      this.currentPage = 1;
      this.total = total;
    },
    async setData(total) {
      this.total = total;
    },
    async changePage(p) {
      this.currentPage = p;
      await this.$emit('search', this.limit, this.offset);
    },
    getLimit() {
      return this.limit;
    }
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
