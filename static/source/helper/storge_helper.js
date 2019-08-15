import localforage from 'localforage';

// class customStorge extends localforageClass{
// 	async getItem(key, expire){
// 		console.log(2222222)
// 		expire = expire ? expire : 604800;
// 		let value = await super.getItem(key);
// 		console.log(value);
// 		if (new Date().getTime() - value.time>expire) {
// 			throw "expired";
// 		}else{
// 		return value.data;
// 		}
// 	}

// 	async setItem(key, value){
// 		console.log(11111)
// 		let curTime = new Date().getTime();
// 		await super.setItem(key, {data:value,time:curTime});
// 		let returnVal = await getItem(key);
// 		return returnVal;
// 	}
// }

const customStorge = localforage.createInstance({
	name:'permStorge'
})

// localforage.config({
//     driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
//     name        : 'myApp',
//     version     : 1.0,
//     size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
//     storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
//     description : 'some description'
// });

const restoreState = async (key, storage, expire) => {
	console.log(2222222)
	expire = expire ? expire : 604800;
	let value = await storage.getItem(key);
	value = typeof value === 'string' ?// If string, parse, or else, just return
					JSON.parse(value || '{}')
	        : (value || {});
	if(new Date().getTime() - value.time>expire) {
		throw "expired";
	}else{
		return value.data;
	}
	// console.log(2222222)
	// expire = expire ? expire : 604800;
	// let value = await storge.getItem(key);
	// console.log(value);
	// if (new Date().getTime() - value.time>expire) {
	// 	throw "expired";
	// }else{
	// return value.data;
	// }
}

const saveState = async (key, value, storage) => {
	console.log(11111)
	let curTime = new Date().getTime();
	// await storge.setItem(key, {data:value,time:curTime});
}

export {
	restoreState,
	saveState,
	customStorge
}