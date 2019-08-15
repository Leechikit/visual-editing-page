import BusinessRule from './business-rule.vue';
import Vue from 'vue';

let ruleInstance;

BusinessRule.newInstance = properties => {
    if(properties){
        properties.eventHub = new Vue();
    }
    const _props = properties || { eventHub: new Vue() };

    const Instance = new Vue({
        data: _props,
        render(h) {
            return h(BusinessRule, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const businessrule = Instance.$children[0];
    businessrule.$on('setValue', businessrule.setValue);

    return {
        show() {
            businessrule.show();
        },
        component: businessrule,
        destroy(element) {
            businessrule.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getRuleInstance(options) {
    options = options || {};
    options.sheetCode = options.sheetCode || '';
    // ruleInstance = ruleInstance || BusinessRule.newInstance(options);
    ruleInstance = BusinessRule.newInstance(options);
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
// ./src/components/console/business-rule/index.js