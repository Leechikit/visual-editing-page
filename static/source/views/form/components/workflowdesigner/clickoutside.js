export default {
    bind (el, binding, vnode) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                if(binding.value && binding.value.handler && typeof (binding.value.handler) ==='function'){
                    binding.value.handler(e);
                }
                
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update () {

    },
    unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
};


// WEBPACK FOOTER //
// ./src/components/workflowdesigner/clickoutside.js