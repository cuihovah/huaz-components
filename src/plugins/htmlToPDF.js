/**
 * props : [{
 *      display: string, // "title", "table", "none", "all",
 *      prop: string, // 属性名
 *      label: string, // 显示的label名称
 *      style: string,
 * }]
 */
// const canvasImg = (dom) => {
//     html2canvas(dom).then(canvas => {
//         let dataURL = canvas.toDataURL("image/png");
//       });
//     return dataURL;
// }

export default{
    install(Vue) {
        Vue.prototype.htmlToPDF = function(container, style) {
            let body = `
                <div class="div-page" ref="imageWrapper">
                    <style>
                        ${style}
                    </style>
                    ${container}
                </div>
            `;
            return body;
        };
        Vue.prototype.printBill = function(container, style) {
            return this.htmlToPDF(container, style);
        };
    }
};
