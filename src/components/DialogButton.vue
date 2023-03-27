<template>
  <span class="hz-dialog-button">
    <el-button :icon="icon" :type="type" :size="size" :disabled="disabled" @click="open">{{ name }}</el-button>
    <el-dialog
        v-elDialogDrag
        :custom-class="CustomClass"
        :show-close="false"
        :title="title"
        :width="width"
        v-if="visibleDialog"
        :append-to-body="true"
        :top="top"
        :fullscreen="fullscreen"
        :visible.sync="visibleDialog">
        <slot></slot>
      <div v-if="showFooter === true" slot="footer" class="dialog-footer">
        <el-button @click="ok" :type="confirmButtonType">{{ confirmButtonText }}</el-button>
        <el-button v-if="otherButton" @click="other" :type="otherButtonType">{{ otherButtonText }}</el-button>
        <el-button v-if="cancelButton" @click="cancel" :type="cancelButtonType">{{ cancelButtonText }}</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>

export default {
  name: 'HzDialogButton',
  props: {
    confirmText: {
      type: String,
      default: '',
    },
    name: String,
    title: String,
    disabled: Boolean,
    size: String,
    type: String,
    width: String,
    top: String,
    icon: String,
    CustomClass: String,
    fullscreen: {
      type: Boolean,
      default: false
    },
    hacked: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确 定'
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancelButton: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: '取 消'
    },
    cancelButtonType: {
      type: String,
      default: ''
    },
    otherButton: {
      type: Boolean,
      default: false,
    },
    otherButtonText: {
      type: String,
      default: '功 能'
    },
    otherButtonType: {
      type: String,
      default: 'warning'
    },
    beforeOpen: {
      type: Function,
      default: () => true
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
   async other() {
    await this.$emit('other', this);
     if (this.hacked === false) {
      this.visibleDialog = false;
     }
   },
   open() {
     if (this.beforeOpen()) {
       if (!!this.confirmText === true) {
         this.$confirm(this.confirmText, '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.$emit('open', this);
           this.visibleDialog = true;
         });
       } else {
         this.$emit('open', this);
         this.visibleDialog = true;
       }
     }
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
