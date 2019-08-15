import FieldAclModal from './field-acl-modal.vue';
import Vue from 'vue';

FieldAclModal.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(FieldAclModal, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const fieldaclmodal = Instance.$children[0];
    fieldaclmodal.$on('setValue', fieldaclmodal.setValue);

    return {
        show() {
            fieldaclmodal.show();
        },
        component: fieldaclmodal,
        destroy(element) {
            fieldaclmodal.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getRuleInstance(options) {
    options = options || {};
    options.sheetCode = options.sheetCode || '';
    let ruleInstance = FieldAclModal.newInstance(options);
    return ruleInstance;
}

function rule(options) {
    let instance = getRuleInstance(options);
    instance.show();
}

export default {
    show(options) {
        return rule(options);
    }
};



// WEBPACK FOOTER //
// ./src/components/sheetdesigner/fieldAclModal/index.js