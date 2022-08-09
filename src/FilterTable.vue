<template>
   <div :style="style">
        <el-input :size="size" clearable v-model="text" @change="change"></el-input>
        <el-table 
          :data="list"
          :row-height="rowHeight"
          :height="tableHeight"
          :header-cell-style="headerCellStyle"
          stripe
          border
          highlight-current-row
          @row-click="click"
          :style="style">
          <el-table-column :prop="label" :label="name"></el-table-column>
        </el-table>
   </div>
</template>
<script>
    import _ from 'underscore';
    export default {
        name: 'HzFilterTable',
        props: {
            data: {
                type: Array
            },
            size: {
                type: String
            },
            style: {
                type: String,
            },
            name: {
                type: String,
            },
            rowHeight: {
                type: Number,
            },
            tableHeight: {
                type: String,
            },
            label: {
                type: String,
            },
            filter: {
                type: Function,
            },
            headerCellStyle: {
                type: Object,
            },
        },
        data() {
            return {
                text: '',
                rawData: [],
            };
        },
        computed: {
            list() {
                let result = this.rawData;
                if (!!this.text === true) {
                    let filter = this.filter;
                    if (filter === undefined) {
                        filter = () => true;
                    }
                    result = _.filter(result, x => filter(x, this.text));
                }
                debugger;
                return result;
            },
        },
        watch: {
            data(v) {
                debugger;
                this.rawData = v;
            },
        },
        methods: {
            click(row) {
                this.$emit('click', row);
            },
        },
    };
</script>


