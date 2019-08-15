import Vue from 'vue';
import symbol from './symbol.js';

const filters = {
    symbol
};
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
