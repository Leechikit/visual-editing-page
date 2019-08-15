import ScheduleRule from './schedule-rule.vue';
import Vue from 'vue';

import store from '../../../store/'
let ruleInstance;

ScheduleRule.newInstance = properties => {
    const _props = properties || {};
    var parms={};
    for(var key in _props){
        parms[key]=_props[key];
    }
    parms["eventHub"]=new Vue();
    const Instance= new Vue({
        // el: '#app',
        // data: {
        //   eventHub: new Vue()
        // },
        data:parms,
        store,
        render(h){
            return h(ScheduleRule,{
                props:_props
            });
        }
        //render: h => h(App)
      });
    // const Instance = new Vue({
    //     data: _props,
    //     render(h) {
    //         return h(ScheduleRule, {
    //             props: _props
    //         });
    //     }
    // });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const scheduleRule = Instance.$children[0];
    scheduleRule.$on('setValue', scheduleRule.setValue);

    return {
        show() {
            scheduleRule.show();
        },
        component: scheduleRule,
        destroy(element) {
            scheduleRule.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getRuleInstance(options) {
    options = options || {};
    options.sheetCode = options.sheetCode || '';
    ruleInstance = ruleInstance || ScheduleRule.newInstance(options);
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
// ./src/components/sheetdesigner/schedule-rule/index.js