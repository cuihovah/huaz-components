import ConfirmButton from './src/ConfirmButton';
import DialogButton from './src/DialogButton';
import Nav from './src/Nav';
import PageFrame from './src/PageFrame';
import SearchBar from './src/SearchBar';
import TablePage from './src/TablePage';
import File from './src/File';
import FilterTable from './src/FilterTable';

const components = [
    ConfirmButton,
    DialogButton,
    Nav,
    PageFrame,
    SearchBar,
    TablePage,
    File,
    FilterTable,
];

const install = function(Vue) {
    components.forEach(function(component) {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install: install,
}
  