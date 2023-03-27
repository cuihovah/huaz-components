import xlsx from 'xlsx';
import _ from 'underscore';

const get_parse_cell = (p) => {
    let c = [];
    let sc = p.c;
    if (sc === 0) {
        c.push(0);
    }
    while (sc > 0) {
        c.push((sc % 26));
        sc = Math.floor(sc / 26);
    }
    let col = '';
    if (c.length > 1) {
        c[c.length - 1] = c[c.length - 1] - 1;
    }
    for (let ix in c) {
        let x = String.fromCharCode(c[ix] + 65);
        col = x + col;
    }
    return `${col}${p.r + 1}`;
};

const get_excel_merge_ranges = (start, end) => {
    let ranges = [];
    for (let rx = start.r; rx <= end.r; rx++) {
        for (let cx = start.c; cx <= end.c; cx++) {
            ranges.push(get_parse_cell({r: rx, c: cx}));
        }
    }
    return ranges;
};

const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let result = [];

        reader.onload = (e) => {
            let data = e.target.result;
            let workbook = xlsx.read(data, { type: 'binary' });
            workbook.SheetNames.forEach((sheetName) => {
                let sheet = workbook.Sheets[sheetName];
                if (sheet['!merges'] !== undefined) {
                    for (let sx in sheet['!merges']) {
                        let merges = get_excel_merge_ranges(sheet['!merges'][sx].s, sheet['!merges'][sx].e);
                        let src = _.find(merges, mx => sheet[mx] !== undefined);
                        if (src === undefined) {
                            src = {};
                        } else {
                            src = sheet[src];
                        }
                        for (let mx in merges) {
                            sheet[merges[mx]] = Object.assign({}, src);
                        }
                    }
                }
                for (let ix in sheet) {
                    let data = sheet[ix];
                    if (data.t !== undefined && data.v !== undefined && data.w !== undefined) {
                        if (data.t === 'n' && String(data.w).toUpperCase().indexOf('E+') >= 0) {          // 科学计数
                            data.t = 's';
                            data.v = String(data.v);
                            data.w = data.v;
                        }
                        if (data.t === 'n' && String(data.v) !== data.w) {          // 时间
                            data.t = 's';
                            data.v = data.w;
                        }
                    }
                }
                let XL_row_object = xlsx.utils.get_formulae(sheet);
                let currentRowNumber = 1;
                let currentRow = {};
                let ret = {
                    name: sheetName,
                    data: [],
                };
                for (let i = 0; i < XL_row_object.length; i++) {
                    let temp = XL_row_object[i];
                    let column = temp.split("=")[0];
                    let value = temp.split("=")[1];
                    let rowNumber = parseInt(column.replace(/[^0-9]+/g, ''));
                    let columnName = column.replace(/[^a-zA-Z]+/g, '');
                    if (value !== undefined && value[0] === "'") {
                        value = value.slice(1);
                    }
                    if (currentRowNumber === rowNumber) {
                        currentRow[columnName] = value;
                    } else {
                        ret.data.push(currentRow);
                        currentRowNumber = rowNumber;
                        currentRow = {};
                        currentRow[columnName] = value;
                    }
                }
                ret.data.push(currentRow);
                if (XL_row_object.length > 0) {
                    result.push(ret);
                }
            });
            resolve(result);
        };

        reader.onerror = function (ex) {
            reject(new Error(ex));
        };

        reader.readAsBinaryString(file);
    });
};

const xlsx_to_json = (list, map, headerRow = 0) => {
    let result = [];
    let dict = {};
    for (let ix in map) {
        let data = map[ix]; // data is {label: string, value: string, Function: function}
        dict[data.label] = data;
    }
    if (list[headerRow] === undefined) {
        throw new Error(`表头信息不存在，请确保第${headerRow + 1}行为表头信息`);
    }
    for (let ix in list[headerRow]) {
        list[headerRow][ix] = list[headerRow][ix].trim();
    }
    for (let prop in list[headerRow]) {
        let value = list[headerRow][prop].trim();
        if (dict[value] !== undefined) {
            dict[value].tag = prop;   // prop is A, B, C
        }
    }
    dict = _.values(dict);
    for (let ix = headerRow + 1; ix < list.length; ix++) {
        let line = list[ix]; // {A: "", B: ""}
        let data = {};
        for (let p in line) {
            let s = line[p];
            let dst = _.find(dict, x => x.tag === p);
            if (dst !== undefined) {
                if (typeof dst.Function === 'function') {
                    s = dst.Function(s);
                }
                data[dst.value] = s;
            }
        }
        result.push(data);
    }
    return result;
};

export default{
    install(Vue) {
        Vue.prototype.excel_to_json = async function(file, map, headerRow = 0) {
            let list = await parseExcel(file);
            return _.map(list, sheet => {
                return {
                    name: sheet.name,
                    data: xlsx_to_json(sheet.data, map, headerRow),
                };
            });
        };
        Vue.prototype.table_to_excel = function(html, filename, sheetName = 'Sheet1') {
            let workbook = xlsx.utils.book_new();
            let table = document.createElement('div');
            table.innerHTML = html;
            let ws1 = xlsx.utils.table_to_sheet(table);
            table.remove();
            xlsx.utils.book_append_sheet(workbook, ws1, sheetName);
            xlsx.writeFile(workbook, filename);
        };
        Vue.prototype.json_to_table = function(list, map, title) {
            return `
            <table>
                ${ title !== undefined ? `<tr><td colspan="${_.keys(map).length}">${title}</td></tr>` : '' }
                <tr>
                    ${_.map(_.values(map), x => `<td>${x}</td>`).join('')}
                </tr>
                ${_.map(list, row => `<tr>${_.map(_.keys(map), x => `<td>${row[x]}</td>`).join('')}</tr>`).join('')}
            </table>`;
        };
        Vue.prototype.json_to_excel = function(list, filename, map, title) {
            let html = this.json_to_table(list, map, title);
            this.table_to_excel(html, filename);
        };
    }
};
