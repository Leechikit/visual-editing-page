import SubmitRule from './submit-rule.vue';
import Vue from 'vue';

SubmitRule.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(SubmitRule, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const submitrule = Instance.$children[0];
    submitrule.$on('setValue', submitrule.setValue);

    return {
        show() {
            submitrule.show();
        },
        component: submitrule,
        destroy(element) {
            submitrule.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getRuleInstance(options) {
    options = options || {};
    options.sheetCode = options.sheetCode || '';
    let ruleInstance = SubmitRule.newInstance(options);
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
// ./src/components/console/submit-rule/index.js