import FormulaEditor from './formula-editor.vue';
import Vue from 'vue';

FormulaEditor.newInstance = properties => {
    const _props = properties || {};
    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(FormulaEditor, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const formulaeditor = Instance.$children[0];

    return {
        show() {
            formulaeditor.show();
        },
        component: formulaeditor,
        destroy(element) {
            formulaeditor.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getRuleInstance(options) {
    options = options || {};
    let formulaInstance = FormulaEditor.newInstance(options);
    return formulaInstance;
}

function formula(options) {
    let instance = getRuleInstance(options);
    instance.show();
}

export default {
    show(options) {
        return formula(options);
    }
};



// WEBPACK FOOTER //
// ./src/components/console/formula/index.js