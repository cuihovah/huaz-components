import ConfirmButton from './src/ConfirmButton';
import DialogButton from './src/DialogButton';
import Nav from './src/Nav';
import PageFrame from './src/PageFrame';
import SearchBar from './src/SearchBar';
import TablePage from './src/TablePage';

const components = [
    ConfirmButton,
    DialogButton,
    Nav,
    PageFrame,
    SearchBar,
    TablePage,
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
}
  