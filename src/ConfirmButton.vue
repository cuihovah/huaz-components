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
    },
    methods: {
        click() {
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
