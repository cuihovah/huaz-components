<template>
  <span class="hz-dialog-input">
    <el-input ref="input" v-model="val" :size="size" :disabled="disabled" @keydown.enter.native="open"></el-input>
    <el-dialog
        :custom-class="CustomClass"
        :show-close="showclose"
        :title="title"
        v-elDialogDrag
        :width="width"
        v-if="visibleDialog"
        :append-to-body="true"
        :top="top"
        :fullscreen="fullscreen"
        :visible.sync="visibleDialog">
        <slot :data="val"></slot>
      <div v-if="showFooter === true" slot="footer" class="dialog-footer">
        <el-button @click="ok" :type="confirmButtonType">{{ confirmButtonText }}</el-button>
        <el-button v-if="otherButton" @click="other" :type="otherButtonType">{{ otherButtonText }}</el-button>
        <el-button @click="cancel" :type="cancelButtonType">{{ cancelButtonText }}</el-button>
      </div>
    </el-dialog>
  </span>
</template>
<script>

export default {
  name: 'HzDialogInput',
  props: {
    name: String,
    value: String,
    title: String,
    disabled: Boolean,
    size: String,
    type: String,
    width: String,
    top: String,
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
    showclose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      val: '',
      visibleDialog: false,
    };
  },
  created() {
    this.val = this.value;
  },
  watch: {
    val: function(val) {
      if (!!val === true) {
        this.$emit('change-book-id', val);
      }
      this.$emit('input', val);
    },
    value(val) {
      this.val = val;
    }
  },
  methods: {
   async set(val) {
    this.val = val;
   },
   async ok() {
     await this.$emit('ok', this.val);
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
     this.$emit('open', this, this.val);
     this.visibleDialog = true;
     this.$refs.input.blur();
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
  .hz-dialog-input {
    * {
      text-align: left;
    }
    .dialog-footer {
      text-align: center;
    }
  }
</style>
