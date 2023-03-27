<template>
  <span class="hz-date-picker">
    <el-date-picker
      v-model="startTime"
      type="date"
      :size="size"
      format="yyyyMMdd"
      :placeholder="placeholder[0]">
    </el-date-picker>
    至
    <el-date-picker
      v-model="endTime"
      type="date"
      :size="size"
      format="yyyyMMdd"
      :placeholder="placeholder[1]">
    </el-date-picker>
  </span>
</template>
<script>


export default {
  name: 'HzDatePickerRange',
  props: {
    value: {
      type: Array,
      default: () => ['', ''],
    },
    size: {
      type: String,
      default: 'mini'
    },
    placeholder: {
      type: Array,
      default: () => ['选择日期', '选择日期'],
    }
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  watch: {
    value(val) {
      if (Array.isArray(val) === false || val.length !== 2) {
        this.startTime = '';
        this.endTime = '';
        return;
      }
      this.startTime = val[0];
      this.endTime = val[1];
    },
    startTime() {
      let result = [this.startTime, this.endTime];
      this.$emit('input', result);
    },
    endTime() {
      let result = [this.startTime, this.endTime];
      this.$emit('input', result);
    },
  },
  created() {
    if (Array.isArray(this.value) === false || this.value.length !== 2) {
        this.startTime = '';
        this.endTime = '';
        return;
      }
      this.startTime = this.value[0];
      this.endTime = this.value[1];
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
.hz-date-picker {
  width: 100%;
  display: inline-block;
  text-align: start;
  .el-date-editor {
    display: inline-block;
    width: 45% !important;
    input {
      display: inline-block;
    }
  }
}
</style>
