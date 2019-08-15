import Vue from 'vue';

let parentNode;

export default {
	permissions:{
		inserted: (el, binding) => {
			parentNode = el.parentNode;
	    if (!Vue.prototype.$_has('permissions', binding.value)) {
	    	console.log('no perm')
	      el.parentNode.removeChild(el);
	    }
	  },
	  // update: (el, binding) => {
	  // 	console.log(parentNode);
	  // 	console.log(binding);
	  // 	console.log(el);
	  // 	// parentNode.append(el);
	  // }
	},
	roles:{
		bind: (el, binding) => {
	    if (!Vue.prototype.$_has('roles', binding.value)) {
	      el.parentNode.removeChild(el);
	    }
	  }
	}
}
