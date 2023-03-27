import axios from 'axios';
// code != 0时不需要弹窗的接口
// 适配vue-resource
const instance = axios.create();
// 临时关闭登录跳转功能
// instance.interceptors.response.use(function (response) {
//     if (response.data && response.data.code === 3 && response.data.msg === '请登录') {
//         window.location.href = response.data.data;
//         return
//     }
//     return response;
// }, function (error) {
//     if (response.data && response.data.code === 3 && response.data.msg === '请登录') {
//         window.location.href = response.data.data;
//         return
//     }
//     return Promise.reject(error);
// });

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    Vue.http = instance;
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
