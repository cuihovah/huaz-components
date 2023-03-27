export default{
    install(Vue) {
        Vue.prototype.$warning = function (msg, type, dangerouslyUseHTMLString) {
            return this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: false,
                dangerouslyUseHTMLString: dangerouslyUseHTMLString === undefined ? false : true,
                type: type === undefined ? 'warning' : type
            });
        };
    }
};
