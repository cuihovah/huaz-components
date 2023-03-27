<template>
    <el-button :type="type" :size="size" :disabled="disabled" @click="click">
        <slot></slot>
    </el-button>
</template>
<script>

export default {
    name: 'HzConfirmButton',
    props: {
        confirm: String,
        type: String,
        size: String,
        disabled: Boolean,
        danger: {
            type: Boolean,
            default: false
        },
    },
    methods: {
        click() {
            if (this.danger === true) {
                this.$alert(`<div class="danger-class">${this.confirm}</div>`, '提示', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('ok');
                }).catch(() => {
                    this.$emit('cancel');
                });
                return;
            }
            this.$confirm(this.confirm, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit('ok');
            }).catch(() => {
                this.$emit('cancel');
            });
        },
    },
};
</script>
<style lang="scss" rel="stylesheet/scss">
.danger-class {
    font-size: 15px;
    color: red;
}
</style>
