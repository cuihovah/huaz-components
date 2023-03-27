// 深度复制数组或对象
const cloneDatas = (obj) => {
    let newObj;
    if (obj instanceof Array) {
        newObj = new Array;
    } else if (obj instanceof Object) {
        newObj = new Object;
    } else if (obj === undefined) {
        newObj = new Array;
    }
    for (let i in obj) {
        if (obj[i] instanceof Object) {
            if (obj instanceof Array) {
                newObj.push(cloneDatas(obj[i]));
            } else if (obj instanceof Object) {
                newObj[i] = cloneDatas(obj[i]);
            }
        } else {
            if (obj instanceof Array) {
                newObj.push(obj[i]);
            } else if (obj instanceof Object) {
                newObj[i] = obj[i];
            }
        }
    }
    return newObj;
};

export default{
    install(Vue) {
        Vue.prototype.cloneDatas = function (options) {
            return cloneDatas(options);
        };
    }
};
