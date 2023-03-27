import ConfirmButton from './src/components/ConfirmButton';
import DialogButton from './src/components/DialogButton';
import PageFrame from './src/components/PageFrame';
import TablePage from './src/components/TablePage';
import File from './src/components/File';
import DatePickerRange from './src/components/DatePickerRange';
import IdentifyCode from './src/components/IdentifyCode';
import DialogInput from "./src/components/DialogInput";

import Alert from "./src/plugins/alert";
import Axios from "./src/plugins/axios";
import cloneDatas from "./src/plugins/cloneDatas";
import htmlToPDF from "./src/plugins/htmlToPDF";
import jsonToPDF from "./src/plugins/jsonToPDF";
import print from "./src/plugins/print";
import time from "./src/plugins/time";
import xlsx from "./src/plugins/xlsx";

const components = [
    ConfirmButton,
    DialogButton,
    PageFrame,
    TablePage,
    File,
    DatePickerRange,
    IdentifyCode,
    DialogInput,
];

const plugins = [
    Alert,
    Axios,
    cloneDatas,
    htmlToPDF,
    jsonToPDF,
    print,
    time,
    xlsx,
];

const install = function(Vue) {
    components.forEach(function(component) {
        Vue.component(component.name, component);
    });
    plugins.forEach(function(plugin) {
        Vue.use(plugin);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install: install,
};
