import ExternalForm from './editor-rule.vue';
import Vue from 'Vue';

let ruleInstance=null;

ExternalForm.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        // data: _props,
        render(h) {
            return h(ExternalForm, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const externalForm = Instance.$children[0];
    //ExternalForm.$on('setValue', ExternalForm.setValue);

    return {
        show() {
            externalForm.show();
        },
        component: externalForm,
        destroy(element) {
            externalForm.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getExternalformInstance(options) {
    options = options || {};
    options.sheetCode = options.sheetCode || '';
    ruleInstance =ExternalForm.newInstance(options);
    return ruleInstance;
}

function rule(options) {
    let instance = getExternalformInstance(options);
    instance.show();
}

function getEditorRule() {
    if(ruleInstance){
        return ruleInstance.RTFData
    }
    else{
        return {
            isArticleMode:false,
            articleTitle:"",
            articleAuthor:""
        }
    }
    
}
export default {
    show(options) {
        return rule(options);
    }
};



// WEBPACK FOOTER //
// ./src/components/sheetdesigner/externalForm/index.js
