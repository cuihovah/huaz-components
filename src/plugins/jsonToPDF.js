import _ from "underscore";

const json2table = (header, list) => {
    let thead = [];
    let span = [];
    for (let ix in header) {
        let value = [];
        let data = header[ix];
        if (!!data.style === true) {
            value.push(`style="${data.style}"`);
        }
        if (!!data.width === true) {
            value.push(`width="${data.width}"`);
        }
        if (data.span === true) {
            span.push(data.value);
        }
        let ret = `<td ${value.join(' ')}>${data.label}</td>`;
        thead.push(ret);
    }
    let tbody = [];
    if (span.length > 0) {
        let result = [];
        let hash = '';
        let d = null;
        for (let ix in list) {
            let data = list[ix];
            let hsh = _.map(span, x => data[x]).join('@@@');
            if (d === null) {
                d = {};
                d.HUAZITEMLIST = [];
                hash = hsh;
            } else if (hash !== hsh) {
                result.push(d);
                d = {};
                d.HUAZITEMLIST = [];
                hash = hsh;
            }
            let item = {};
            for (let cx in header) {
                let col = header[cx];
                if (data[col.value] === undefined) {
                    continue;
                }
                if (col.span === true) {
                    d[col.value] = data[col.value];
                } else {
                    item[col.value] = data[col.value];
                }
            }
            d.HUAZITEMLIST.push(item);
        }
        result.push(d);
        list = result;
    } else {
        list = _.map(list, x => {
            return {HUAZITEMLIST: [x]};
        });
    }
    for (let ix in list) {
        let item = list[ix];
        for (let x in item.HUAZITEMLIST) {
            let line = [];
            let hzitem = item.HUAZITEMLIST[x];
            for (let cx in header) {
                let col = header[cx];
                let value = [];
                if (item[col.value] === undefined && hzitem[col.value] === undefined) {
                    line.push(`<td ${value.join(' ')}></td>`);
                    continue;
                }
                if (!!col.bodyStyle === true) {
                    value.push(`style="${col.bodyStyle}"`);
                }
                let v = item[col.value] === undefined ? hzitem[col.value] : item[col.value];
                if (typeof col.Function === 'function') {
                    v = col.Function(v);
                }
                let that = item;
                if (that[col.value] !== undefined && that.HUAZITEMLIST.length > 1 && x * 1 === 0) {
                    line.push(`<td rowspan="${that.HUAZITEMLIST.length}" ${value.join(' ')}>${v}</td>`);
                } else if (that[col.value] !== undefined && that.HUAZITEMLIST.length > 1 && x * 1 !== 0) {
                    continue;
                } else {
                    line.push(`<td ${value.join(' ')}>${v}</td>`);
                }
            }
            tbody.push(`<tr>${line.join('')}</tr>`);
        }
    }
    let table = `
    <table class="table-body" border=1 cellspacing=0 cellpadding=0 style="border: 1px solid;">
        <thead>
            <tr>${thead.join('')}</tr>
        </thead>
        <tbody>
            ${tbody.join('')}
        </tbody>
    </table>
    `;
    return table;
};

/**
 * props : [{
 *      display: string, // "title", "table", "none", "all",
 *      prop: string, // 属性名
 *      label: string, // 显示的label名称
 *      style: string,
 * }]
 */
const preferenceTitle = (data, props) => {
    props = _.filter(props, x => x.display === 'title' || x.display === 'all');
    let values = [];
    for (let ix in props) {
        let prop = props[ix];
        let val = _.pluck(data, prop.prop);
        if (typeof prop.Function === "function") {
            val = _.map(val, x => prop.Function(x));
        }
        values.push({
            label: prop.label,
            style: prop.style,
            values: _.uniq(val),
        });
    }
    return `<div class="huaz-table-title">
        ${_.map(values, x => `<span style="display:inline-block;margin-right: 12px;${x.style}"><span class="huaz-label">${x.label}：</span>${x.values.join('，')}</span>`).join('')}
    </div>`;
};

export default{
    install(Vue) {
        Vue.prototype.jsonToPDF = function(title, header, list, BodyHeader, BodyFooter, style) {
            if (!!BodyHeader === false) {
                BodyHeader = '';
            }
            if (!!BodyFooter === false) {
                BodyFooter = '';
            }
            let table = json2table(header, list);
            let body = `
                <div class="div-page">
                    <style>
                        ${style}
                    </style>
                    <h1>${title}</h1>
                    ${BodyHeader}
                    ${table}
                    ${BodyFooter}
                </div>
            `;
            return body;
        };
        Vue.prototype.printTablePreference = function(title, header, list, props, BodyHeader, BodyFooter, style) {
            header = _.filter(header, x => {
                let prop = _.find(props, p => p.prop === x.value);
                return prop === undefined || prop.display === 'table' || prop.display === 'all';
            });
            let bodyTitle = preferenceTitle(list, props);
            return this.jsonToPDF(title, header, list, `${BodyHeader}${bodyTitle}`, BodyFooter, style);
        };
    }
};
