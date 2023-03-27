export default{
    install(Vue) {
        Vue.prototype.print = function (html, success, error) {
            try {
                let dom = document.getElementById('print');
                dom.innerHTML = html;
                $('#print svg').each((ix, value) => {
                    let id = $(value).attr('value');
                    $(value).JsBarcode(id, {
                        height: 40,
                        width: 1,
                        displayValue: true,
                        margin: 0,
                        padding: 0,
                    });
                });
                window.print();
                setTimeout(() => {
                    dom.innerHTML = '';
                }, 1 * 1000);
                if (success) {
                    success();
                }
            } catch (e) {
                if (error) {
                    error();
                }
            }
        };
    }
};
