<template>
  <span class="hz-dialog-button">
    <el-button :icon="icon" :type="type" :size="size" :disabled="disabled" @click="open">{{ name }}</el-button>
    <el-dialog
        :show-close="true"
        :title="title"
        :width="width"
        v-if="visibleDialog"
        :append-to-body="true" 
        :top="top"
        :fullscreen="fullscreen"
        :visible.sync="visibleDialog">
        <slot></slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ok" type="primary">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>

export default {
  name: 'HzDialogButton',
  props: {
    name: String,
    title: String,
    disabled: Boolean,
    size: String,
    type: String,
    width: String,
    top: String,
    icon: String,
    fullscreen: {
      type: Boolean,
      default: false
    },
    hacked: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      visibleDialog: false,
    };
  },
  methods: {
   async ok() {
     await this.$emit('ok', this);
     if (this.hacked === false) {
      this.visibleDialog = false;
     }
   },
   async cancel() {
     await this.$emit('cancel', this);
     if (this.hacked === false) {
      this.visibleDialog = false;
     }
   },
   open() {
     this.$emit('open', this);
     this.visibleDialog = true;
   },
   openDialog() {
     this.visibleDialog = true;
   },
   closeDialog() {
     this.visibleDialog = false;
   },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
  .hz-dialog-button {
    * {
      text-align: left;
    }
    .dialog-footer {
      text-align: center;
    }
  }
</style>
